// #region Global Imports
import "swiper/swiper.scss"
import "@Static/css/fonts.css"
import "/styles/reset.css"
import "/styles/style.scss"

import { AppInitialProps, AppContext, AppProps } from "next/app"
import { useRouter, withRouter } from "next/router"
import { ThemeProvider } from "styled-components"
import { ReactReduxContext, useSelector } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { CSSTransition, TransitionGroup } from "react-transition-group"
import { NextComponentType } from "next"
import { createRef, useEffect, useState } from "react"
// #endregion Global Imports

// #region Local Imports
import { ThemeObj, ThemeType } from "@Definitions/Styled"
import { RootState, wrapper } from "@Redux"
import TheLayout, { LayoutCode } from "@Components/Layout"
import "@Services/API/DateFormat"
import { Nav } from "@Components"
// #endregion Local Imports

const formatPathname = (url: string) =>
    url
        .replace(/\/[0-9]{1,}/g, "") //seq 제거
        .replace("/en", "") //locale 제거
        .replace("/[seq]", "") //seq 제거2
        .replace(/\/$/g, "") //마지막 / 제거
        .split("?")[0] || //query string 제거
    "/"
const WebApp: NextComponentType<AppContext, AppInitialProps, AppProps> = ({ Component, pageProps }) => {
    const router = useRouter()
    const { app } = useSelector(({ appReducer }: RootState) => ({
        app: appReducer,
    }))
    const [nextPathname, setNextPathname] = useState<string>(formatPathname(router.pathname))
    const [prevPathname, setPrevPathname] = useState<string>(formatPathname(router.pathname))
    const layoutRef = createRef()
    const AppLayout = TheLayout[pageProps?.layout || LayoutCode.Default]
    const theme = ThemeObj[ThemeType[app.sel_theme || ""] || ThemeType.WHITE]

    const handleRouteChange = (url: string) =>
        setNextPathname((prevPathname) => {
            setPrevPathname(prevPathname)
            return formatPathname(url)
        })
    useEffect(() => {
        router.events.on("routeChangeStart", handleRouteChange)
        return () => {
            router.events.off("routeChangeStart", handleRouteChange)
        }
    }, [])
    return (
        <ThemeProvider theme={theme}>
            <ReactReduxContext.Consumer>
                {({ store }: any) => (
                    <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
                        <Nav refContainer={layoutRef} selIdx={app.sel_nav || null} />
                        <TransitionGroup className="l_transition-wrap">
                            <CSSTransition
                                key={router.pathname}
                                timeout={{
                                    enter: 400,
                                    exit: 400,
                                }}
                                classNames={pageProps?.transition || ""}
                            >
                                <div className={"l_transition " + nextPathname + "-from-" + prevPathname}>
                                    <AppLayout {...pageProps} ref={layoutRef}>
                                        <Component {...pageProps} layoutRef={layoutRef} />
                                    </AppLayout>
                                </div>
                            </CSSTransition>
                        </TransitionGroup>
                    </PersistGate>
                )}
            </ReactReduxContext.Consumer>
        </ThemeProvider>
    )
}
WebApp.getInitialProps = async ({ Component, ctx }: AppContext): Promise<AppInitialProps> => {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}

    return { pageProps: pageProps }
}

// class WebApp extends App<AppWithStore> {
//     constructor(props: any) {
//         super(props)
//         this.state = {
//             refContainer: React.createRef(),
//             nextPathname: this.props.router.pathname,
//             prevPathname: this.props.router.pathname,
//         }
//     }
//     static async getInitialProps({ Component, ctx }: AppContext): Promise<AppInitialProps> {
//         const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}

//         return { pageProps: pageProps }
//     }
//     handleRouteChange = (url: string) => {
//         this.setState({
//             ...this.state,
//             nextPathname: url.split("?")[0],
//             prevPathname: this.props.router.pathname,
//         })
//     }
//     componentDidMount() {
//         this.props.router.events.on("routeChangeStart", this.handleRouteChange)
//     }
//     componentWillUnmount() {
//         this.props.router.events.off("routeChangeStart", this.handleRouteChange)
//     }
//     render() {
//         const { Component, pageProps, router, sel_theme, sel_nav }: any = this.props
//         const { nextPathname, prevPathname, refContainer }: any = this.state
//         const AppLayout = TheLayout[pageProps?.layout || LayoutCode.Default]
//         return (
//             <ThemeProvider theme={ThemeObj[ThemeType[sel_theme] || ThemeType.WHITE]}>
//                 <PersistGate persistor={persistor} loading={<div>Loading</div>}>
//                     <Nav refContainer={refContainer} selIdx={sel_nav || null} />
//                     <TransitionGroup
//                         id="__TRANSITION"
//                         style={{
//                             overflow: "hidden",
//                             position: "relative",
//                             width: "100%",
//                             height: "100%",
//                         }}
//                     >
//                         <CSSTransition
//                             appear={true}
//                             key={router.pathname}
//                             timeout={{
//                                 enter: 400,
//                                 exit: 390,
//                             }}
//                             classNames={pageProps?.transition || ""}
//                         >
//                             <div className={"l_transition " + nextPathname + "From" + prevPathname}>
//                                 <AppLayout refContainer={refContainer} ref={refContainer} {...pageProps}>
//                                     <Component {...pageProps} />
//                                 </AppLayout>
//                             </div>
//                         </CSSTransition>
//                     </TransitionGroup>
//                 </PersistGate>
//             </ThemeProvider>
//         )
//     }
// }
// const mapStateToProps = (state: IStore) => ({
//     sel_theme: state.app.sel_theme,
//     sel_nav: state.app.sel_nav,
// })

// export default wrapper.withRedux(withRouter(WebApp))
// export default withRedux(makeStore)(appWithTranslation(WebApp));
//export default wrapper.withRedux(connect(mapStateToProps)(withRouter(WebApp)))
export default wrapper.withRedux(WebApp)
