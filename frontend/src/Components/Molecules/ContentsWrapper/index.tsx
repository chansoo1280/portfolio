// #region Global Imports
import React, { ReactNode } from "react"
import classNames from "classnames"
// #endregion Global Imports

// #region Local Imports
import styles from "./ContentsWrapper.module.scss"
// #endregion Local Imports
interface Props {
    children?: ReactNode
}
const ContentsWrapper: React.FunctionComponent<Props> = (props) => {
    const classes = classNames({
        [styles["content-wrapper"]]: true,
    })
    return <div className={classes} {...props} />
}

export { ContentsWrapper }
