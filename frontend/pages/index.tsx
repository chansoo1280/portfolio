// #region Global Imports
import { useEffect } from "react"
// #endregion Global Imports

// #region Local Imports
import { MainView } from "@Components"
import { useDispatch } from "react-redux"
import { AppActions } from "@Reducers"
// #endregion Local Imports

const Page = (): JSX.Element => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(AppActions.setNav(null))
    })
    return (
        <>
            <MainView />
        </>
    )
}
Page.getStaticProps = async () => ({
    props: {},
})
export default Page
