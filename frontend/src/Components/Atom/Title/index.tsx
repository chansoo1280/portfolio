// #region Global Imports
import React, { ReactNode } from "react"
import classNames from "classnames"
// #endregion Global Imports

// #region Local Imports
import styles from "./Title.module.scss"
// #endregion Local Imports
export interface TitleProps {
    children?: ReactNode
    ir?: boolean
    border?: boolean
    center?: boolean
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span"
    className?: string
    type?: "default" | "primary"
}

const Title: React.FunctionComponent<TitleProps> = (props) => {
    const { as, ir, border, center, className, type = "default", ...rest } = props
    const classes = classNames(
        {
            [styles["title"]]: true,
            [styles[`title--${as}`]]: true,
            [styles[`title--${type}`]]: true,
            [styles[`title--border`]]: border === true,
            [styles[`title--center`]]: center === true,
            ["ir"]: ir === true,
        },
        className,
    )
    const TitleNode = `${as}` as keyof JSX.IntrinsicElements
    return <TitleNode className={classes} {...rest} />
}

export { Title }
