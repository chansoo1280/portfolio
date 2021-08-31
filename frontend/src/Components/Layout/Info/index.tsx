// #region Global Imports
import Head from "next/head"
import className from "classnames"
// #endregion Global Imports

// #region Local Imports
// import { StyledWrap } from "./styled"
import { Footer, TopBtn } from "@Components"
import styles from "./Info.module.scss"
import { ILayout } from "../Layout"
import { useRef } from "react"
// #endregion Local Imports

export const Info = ({ children }: ILayout.IProps): JSX.Element => {
    const refContainer = useRef<HTMLDivElement>(null)
    const classes = className("l_wrap", styles["l_wrap--info"])
    return (
        <>
            <Head>
                <title>portfolio</title>
                <meta name="description" content="portfolio" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/xeicon@2.3.3/xeicon.min.css"></link>
            </Head>
            <div ref={refContainer} className={classes}>
                {children}
                <Footer />
                <TopBtn container={refContainer} />
            </div>
        </>
    )
}
