// #region Global Imports
import React, { ReactNode } from "react"
import classNames from "classnames"
// #endregion Global Imports

// #region Local Imports
import styles from "./Title.module.scss"
// #endregion Local Imports
interface Props {
    children?: ReactNode
    ir?: boolean
    border?: boolean
    center?: boolean
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span"
}
const Title: React.FunctionComponent<Props> = (props) => {
    const { as, ir, border, center } = props
    const classes = classNames({
        [styles["title"]]: true,
        [styles[`title--${as}`]]: true,
        [styles[`title--border`]]: border === true,
        [styles[`title--center`]]: center === true,
        ["ir"]: ir === true,
    })
    return <h1 as={as} className={classes} {...props} />
}

export { Title }
