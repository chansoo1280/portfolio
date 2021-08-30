// #region Global Imports
import Link from "next/link"
import classNames from "classnames"

// #endregion Global Imports// #region Local Imports

import { Button } from "@Components/Atom"
import { INav, NavIdx } from "./Nav.d"
import styles from "./nav.module.scss"
import { AppActions } from "@Actions"
import { ActionConsts } from "@Definitions"
import { useDispatch } from "react-redux"

// #endregion Local Imports
export { NavIdx }

export const Nav = (props: INav.IProps): JSX.Element => {
    const { selIdx } = props
    const dispatch = useDispatch()
    const classes = classNames({
        [styles["nav"]]: true,
        [styles["nav--active"]]: selIdx !== null,
    })
    return (
        <>
            <nav className={classes} {...props}>
                <Link href="/works">
                    <a className={styles["nav__link"]}>WORKS</a>
                </Link>
                <Link href="/works">
                    <a className={styles["nav__link"]}>RESUME</a>
                </Link>
                <Link href="/works">
                    <a className={styles["nav__link"]}>CONTACT</a>
                </Link>
            </nav>
        </>
    )
}
