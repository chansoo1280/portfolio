// #region Global Imports
// #endregion Global Imports

// #region Local Imports
import { ReduxNextPageContext } from "@Interfaces"
import { LayoutCode } from "@Components"
import { useEffect } from "react"
import { AppActions } from "@Actions"
import { NavIdx, Title, ContentsWrapper, Work } from "@Components"
import { useAppDispatch } from "@Redux"
// #endregion Local Imports

const Page = (): JSX.Element => {
    const dispatch = useAppDispatch()
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
            <Work title="준비중입니다..."></Work>
            <Title as="h2" center>
                2020
            </Title>
            <Work title="준비중입니다..."></Work>
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
