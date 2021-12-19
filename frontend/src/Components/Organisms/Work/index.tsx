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
    background?: string
}
const Work: React.FunctionComponent<Props> = (props) => {
    const { title, background } = props
    const classes = classNames({
        [styles["work"]]: true,
    })
    return (
        <div
            className={classes}
            style={{
                background,
            }}
        >
            <strong className={styles["work__title"]}>{title}</strong>
        </div>
    )
}

export { Work }
