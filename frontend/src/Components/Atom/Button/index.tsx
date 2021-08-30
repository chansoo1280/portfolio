// #region Global Imports
import React from "react"
import Link from "next/link"
import classNames from "classnames"
// #endregion Global Imports

// #region Local Imports
import { IButton } from "./Button"
import styles from "./Button.module.scss"
// #endregion Local Imports

const Button: React.FunctionComponent<IButton.IProps> = (props) => {
    const { href, className, flex, size } = props
    const classes = classNames(className, {
        [styles["btn"]]: true,
        [styles["btn--flex"]]: flex,
        [styles["btn--lg"]]: size === "large",
        [styles["btn--sm"]]: size === "small",
    })
    return href !== undefined ? (
        <Link href={href}>
            <a className={classes} {...props} />
        </Link>
    ) : (
        <button className={classes} {...props} />
    )
}
Button.defaultProps = {
    type: "button",
}

export { Button }
