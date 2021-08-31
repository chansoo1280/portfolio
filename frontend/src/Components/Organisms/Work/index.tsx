// #region Global Imports
import React, { ReactNode } from "react"
import classNames from "classnames"
// #endregion Global Imports

// #region Local Imports
import styles from "./Work.module.scss"
// #endregion Local Imports
interface Props {
    children?: ReactNode
    title: string
}
const Work: React.FunctionComponent<Props> = (props) => {
    const { title } = props
    const classes = classNames({
        [styles["work"]]: true,
    })
    return (
        <div className={classes}>
            <strong className={styles["work__title"]}>{title}</strong>
        </div>
    )
}

export { Work }
