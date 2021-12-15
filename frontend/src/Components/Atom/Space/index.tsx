// #region Global Imports
import classNames from "classnames"
import { ReactNode } from "react"
// #endregion Global Imports

// #region Local Imports
import styles from "./Space.module.scss"

// #endregion Local Imports
interface Props {
    children?: ReactNode
    padding?: string
    margin?: string
    background?: string
    className?: string
    direction?: "row" | "row-reverse" | "column" | "column-reverse"
    align?: "flex-start" | "center" | "flex-end"
    vAlign?: "flex-start" | "center" | "flex-end"
    gap?: string
    cover?: boolean
    flex?: boolean
    as?: "div" | "ol" | "ul" | "li"
}

const Space = (props: Props): JSX.Element => {
    const { as = "div", flex, gap, padding, margin, background, direction, align, vAlign, children, className, cover } = props
    const classes = classNames(
        styles["space"],
        {
            [styles["space--cover"]]: cover,
            [styles["space--flex"]]: flex,
            // [styles["space--" + direction]]: direction,
        },
        className,
    )
    const BoxNode = `${as}` as keyof JSX.IntrinsicElements
    return (
        <BoxNode style={{ gap, padding, margin, background, flexDirection: direction, justifyContent: align, alignItems: vAlign }} className={classes}>
            {children}
        </BoxNode>
    )
}
export default Space
