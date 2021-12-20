// #region Global Imports
import { forwardRef } from "react"
import className from "classnames"
// #endregion Global Imports

// #region Local Imports
// import { StyledWrap } from "./styled"
import styles from "./Default.module.scss"
import { ILayout } from "../Layout"
// #endregion Local Imports

export const Default = forwardRef<HTMLDivElement, ILayout.IProps>(({ children }: ILayout.IProps, ref): JSX.Element => {
    const classes = className(styles["l_wrap"])
    return (
        <>
            <div className={classes} ref={ref}>
                {children}
            </div>
        </>
    )
})
