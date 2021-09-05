// #region Global Imports
// #endregion Global Imports

// #region Local Imports
import { ReduxNextPageContext } from "@Interfaces"
import { LayoutCode } from "@Components"
import { useEffect } from "react"
import { AppActions } from "@Actions"
import { NavIdx, Title, Profile, Skills, ContentsWrapper } from "@Components"
import { useAppDispatch } from "@Redux"
// #endregion Local Imports

const Page = (): JSX.Element => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(AppActions.SetSelNav(NavIdx.RESUME))
    })
    return (
        <>
            <ContentsWrapper>
                <Title as="h1" ir>
                    resume
                </Title>
                <Title as="h2" border>
                    ChanSoo kim
                </Title>
                <Profile />
                <Title as="h2" border>
                    Skills
                </Title>
                <Skills />
                <Title as="h2" border>
                    Work Experience
                </Title>
            </ContentsWrapper>
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
