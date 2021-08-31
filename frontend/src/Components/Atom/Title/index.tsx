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
    switch (as) {
        case "h1": {
            return <h1 className={classes} {...props} />
        }
        case "h2": {
            return <h2 className={classes} {...props} />
        }
        case "h3": {
            return <h3 className={classes} {...props} />
        }
        case "h4": {
            return <h4 className={classes} {...props} />
        }
        case "h5": {
            return <h5 className={classes} {...props} />
        }
        case "h6": {
            return <h6 className={classes} {...props} />
        }
        case "span": {
            return <span className={classes} {...props} />
        }
        default: {
            return <h1 className={classes} {...props} />
        }
    }
}

export { Title }
