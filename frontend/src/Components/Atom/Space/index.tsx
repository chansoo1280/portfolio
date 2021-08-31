// #region Global Imports
import React, { ReactNode } from "react"
// #endregion Global Imports

// #region Local Imports
import styles from "./Space.module.scss"
// #endregion Local Imports

interface Props {
    children?: ReactNode
}

const Space: React.FunctionComponent<Props> = (props) => {
    return <div className={styles["space"]} {...props} />
}

export { Space }
