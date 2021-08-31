// #region Global Imports
// #endregion Global Imports

// #region Local Imports
import { ReduxNextPageContext } from "@Interfaces"
import { Nav, MainView, LayoutCode } from "@Components"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { AppActions } from "@Actions"
import { NavIdx } from "@Components"
// #endregion Local Imports

const Page = (): JSX.Element => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(AppActions.SetSelNav(NavIdx.RESUME))
    })
    return (
        <>
            <div>
                <h1>resume</h1>
            </div>
        </>
    )
}
Page.getInitialProps = async (ctx: ReduxNextPageContext) => {
    return {
        layout: LayoutCode.Info,
        transition: "info",
    }
}
export default Page
