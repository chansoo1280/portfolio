// #region Global Imports
// #endregion Global Imports

// #region Local Imports
import { LayoutCode } from "@Components"
import { useEffect } from "react"
import { NavIdx, Space, Title, Contact } from "@Components"
import { useDispatch } from "react-redux"
import { AppActions } from "@Reducers"

import styles from "./contact.module.scss"
// #endregion Local Imports

const Page = (): JSX.Element => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(AppActions.setNav(NavIdx.CONTACT))
    }, [])
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
