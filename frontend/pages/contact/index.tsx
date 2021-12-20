// #region Global Imports
// #endregion Global Imports

// #region Local Imports
import { LayoutCode } from "@Components"
import { Space, Title, Contact } from "@Components"

import styles from "./contact.module.scss"
// #endregion Local Imports

const Page = (): JSX.Element => {
    return (
        <Space padding="20px 36px" direction="column" gap="20px">
            <Title as="h1" ir>
                contact
            </Title>
            <Title as="span" center className={styles["contact__banner"]}>
                Thank you for visiting!
            </Title>
            <Contact />
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
