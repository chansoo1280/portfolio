// #region Global Imports
import { forwardRef, RefObject } from "react"
import className from "classnames"
// #endregion Global Imports

// #region Local Imports
// import { StyledWrap } from "./styled"
import { Footer, TopBtn } from "@Components"
import styles from "./Info.module.scss"
import { ILayout } from "../Layout"
// #endregion Local Imports

const Info = forwardRef<HTMLDivElement, ILayout.IProps>(({ children }, ref) => {
    const classes = className(styles["l_wrap"])
    return (
        <>
            <div ref={ref} className={classes}>
                {children}
                <Footer />
            </div>
            <TopBtn container={ref as RefObject<HTMLDivElement>} />
        </>
    )
})
export default Info
