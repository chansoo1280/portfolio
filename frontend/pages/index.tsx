// #region Global Imports
// #endregion Global Imports

// #region Local Imports
import { MainView } from "@Components"
// #endregion Local Imports

const Page = (): JSX.Element => {
    return (
        <>
            <MainView />
        </>
    )
}
export const getStaticProps = async (): Promise<any> => ({
    props: {},
})
export default Page
