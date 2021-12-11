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
    const classes = className(styles["l_wrap"])
    return (
        <>
            <div ref={ref} className={classes}>
                {children}
                <Footer />
                <TopBtn container={ref as RefObject<HTMLDivElement>} />
            </div>
        </>
    )
})
export default Info
