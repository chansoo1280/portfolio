// #region Global Imports
// #endregion Global Imports

// #region Local Imports
import { LayoutCode } from "@Components"
import { useEffect } from "react"
import { NavIdx, ContentsWrapper, Title, Contact } from "@Components"
import { useDispatch } from "react-redux"
import { AppActions } from "@Reducers"
// #endregion Local Imports

const Page = (): JSX.Element => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(AppActions.setNav(NavIdx.CONTACT))
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
Page.getStaticProps = async () => ({
    props: {
        layout: LayoutCode.Info,
        transition: "info",
    },
})
export default Page
