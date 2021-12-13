// #region Global Imports
// #endregion Global Imports

// #region Local Imports
import { LayoutCode } from "@Components"
import { useEffect } from "react"
import { NavIdx, Title, Profile, Skills, ContentsWrapper } from "@Components"
import { useDispatch } from "react-redux"
import { AppActions } from "@Reducers"
// #endregion Local Imports

const Page = (): JSX.Element => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(AppActions.setNav(NavIdx.RESUME))
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
                {/* <Title as="h2" border>
                    Skills
                </Title>
                <Skills /> */}
                <Title as="h2" border>
                    Work Experience
                </Title>
            </ContentsWrapper>
        </>
    )
}
export const getStaticProps = async (): Promise<any> => ({
    props: {
        layout: LayoutCode.Info,
        transition: "info",
    },
})
export default Page
