// #region Global Imports
// #endregion Global Imports

// #region Local Imports
import { LayoutCode, Space, TimeLine } from "@Components"
import { useEffect } from "react"
import { NavIdx, Title, Profile, Skills, ContentsWrapper } from "@Components"
import { useDispatch } from "react-redux"
import { AppActions } from "@Reducers"
// #endregion Local Imports

const Page = (): JSX.Element => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(AppActions.setNav(NavIdx.RESUME))
    }, [])
    return (
        <>
            <Title as="h1" ir>
                resume
            </Title>
            <Title as="h2" ir>
                profile
            </Title>
            <Profile />
            <Title as="h2" center>
                Time-Line
            </Title>
            <TimeLine />
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
