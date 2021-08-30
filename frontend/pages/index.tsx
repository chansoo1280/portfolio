// #region Global Imports
// #endregion Global Imports

// #region Local Imports
import { ReduxNextPageContext } from "@Interfaces"
// #endregion Local Imports

const Page = (): JSX.Element => {
    return <main id="contents" className="l_main"></main>
}
Page.getInitialProps = async (ctx: ReduxNextPageContext) => {
    // return {
    //     layout: LayoutCode.Info,
    //     transition: "slide",
    // }
    return {}
}
export default Page
