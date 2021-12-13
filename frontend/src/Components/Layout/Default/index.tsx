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
    const classes = className(styles["l_wrap"])
    return (
        <>
            <div className={classes}>{children}</div>
        </>
    )
}
