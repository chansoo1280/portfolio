// #region Global Imports
// #endregion Global Imports

// #region Local Imports
import { ReduxNextPageContext } from "@Interfaces"
import { Nav, MainView, LayoutCode } from "@Components"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { AppActions } from "@Actions"
import { NavIdx, ContentsWrapper, Title, Contact } from "@Components"
import { useAppDispatch } from "@Redux"
// #endregion Local Imports

const Page = (): JSX.Element => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(AppActions.SetSelNav(NavIdx.CONTACT))
    })
    return (
        <ContentsWrapper>
            <Title as="h1" ir>
                contact
            </Title>
            <Contact />
            <Title as="span" center>
                Thank you for visiting!
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
