// #region Global Imports
import React from "react"
import Link from "next/link"
// #endregion Global Imports

// #region Local Imports
import { ISpace } from "./Space"
import styles from "./Space.module.scss"
// #endregion Local Imports

const Space: React.FunctionComponent<ISpace.IProps> = (props) => {
    return <div className={styles["space"]} {...props} />
}

export { Space }
