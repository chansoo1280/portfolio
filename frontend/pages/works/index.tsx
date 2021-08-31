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
        dispatch(AppActions.SetSelNav(NavIdx.WORKS))
    })
    return (
        <ContentsWrapper>
            <Title as="h1" ir>
                works
            </Title>
            <Title as="h2" center>
                2021
            </Title>
            <Title as="h2" center>
                2020
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
