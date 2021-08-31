// #region Global Imports
// #endregion Global Imports

// #region Local Imports
import { ReduxNextPageContext } from "@Interfaces"
import { MainView } from "@Components"
import { useEffect } from "react"
import { AppActions } from "@Actions"
import { useDispatch } from "react-redux"
// #endregion Local Imports

const Page = (): JSX.Element => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(AppActions.SetSelNav(null))
    })
    return (
        <>
            <MainView />
        </>
    )
}
Page.getInitialProps = async (ctx: ReduxNextPageContext) => {
    // return {
    //     layout: LayoutCode.Info,
    //     transition: "slide",
    // }
    return {}
}
export default Page
