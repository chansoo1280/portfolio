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
export default wrapper.withRedux(WebApp)
