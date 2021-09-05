// #region Global Imports
import Head from "next/head"
import className from "classnames"
// #endregion Global Imports

// #region Local Imports
// import { StyledWrap } from "./styled"
import styles from "./Default.module.scss"
import { ILayout } from "../Layout"
// #endregion Local Imports

export const Default = ({ children }: ILayout.IProps): JSX.Element => {
    const classes = className("l_wrap", styles["l_wrap--default"])
    return (
        <>
            <Head>
                <title>Chansoo's Portfolio</title>
                <meta name="description" content="Chansoo's Portfolio" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/xeicon@2.3.3/xeicon.min.css"></link>
            </Head>
            <div className={classes}>{children}</div>
        </>
    )
}
