// #region Global Imports
// #endregion Global Imports

// #region Local Imports
import { ReduxNextPageContext } from "@Interfaces"
import { Nav, MainView, LayoutCode } from "@Components"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { AppActions } from "@Actions"
import { NavIdx, Title, ContentsWrapper } from "@Components"
// #endregion Local Imports

const Page = (): JSX.Element => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(AppActions.SetSelNav(NavIdx.RESUME))
    })
    return (
        <ContentsWrapper>
            <Title as="h1" ir>
                resume
            </Title>
            <Title as="h2" border>
                ChanSoo kim
            </Title>
            <Title as="h2" border>
                Skills
            </Title>
            <Title as="h2" border>
                Work Experience
            </Title>
        </ContentsWrapper>
    )
}
Page.getInitialProps = async (ctx: ReduxNextPageContext) => {
    return {
        layout: LayoutCode.Info,
        transition: "info",
    }
}
export default Page
