// #region Global Imports
// #endregion Global Imports

// #region Local Imports
import { LayoutCode } from "@Components"
import { Title, Space, Work } from "@Components"
// #endregion Local Imports

const Page = (): JSX.Element => {
    return (
        <Space direction="column">
            <Title as="h1" ir>
                works
            </Title>
            <Title as="h2" center>
                2021
            </Title>
            <Work title="KIYO - 통합계정관리(2021-12)" background="url(/static/images/Works/works01.svg)no-repeat center /cover"></Work>
        </Space>
    )
}
export const getStaticProps = async (): Promise<any> => ({
    props: {
        layout: LayoutCode.Info,
        transition: "info",
    },
})
export default Page
