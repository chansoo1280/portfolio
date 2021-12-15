// #region Global Imports
// #endregion Global Imports

// #region Local Imports
import { LayoutCode } from "@Components"
import { useEffect } from "react"
import { NavIdx, Title, ContentsWrapper, Work } from "@Components"
import { useDispatch } from "react-redux"
import { AppActions } from "@Reducers"
// #endregion Local Imports

const Page = (): JSX.Element => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(AppActions.setNav(NavIdx.WORKS))
    }, [])
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
export const getStaticProps = async (): Promise<any> => ({
    props: {
        layout: LayoutCode.Info,
        transition: "info",
    },
})
export default Page
