// #region Global Imports
import Head from "next/head"
import className from "classnames"
// #endregion Global Imports

// #region Local Imports
// import { StyledWrap } from "./styled"
import { Footer, TopBtn } from "@Components"
import styles from "./Info.module.scss"
import { ILayout } from "../Layout"
import { forwardRef, RefObject, useRef } from "react"
// #endregion Local Imports

const Info = forwardRef<HTMLDivElement, ILayout.IProps>(({ children }, ref) => {
    const classes = className("l_wrap", styles["l_wrap--info"])
    return (
        <>
            <Head>
                <title>Chansoo's Portfolio</title>
                <meta name="description" content="Chansoo's Portfolio" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/xeicon@2.3.3/xeicon.min.css"></link>
            </Head>
            <div ref={ref} className={classes}>
                {children}
                <Footer />
                <TopBtn container={ref as RefObject<HTMLDivElement>} />
            </div>
        </>
    )
})
export default Info
