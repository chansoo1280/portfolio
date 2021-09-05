// #region Global Imports
import Link from "next/link"
import classNames from "classnames"

// #endregion Global Imports// #region Local Imports

import { INav, NavIdx } from "./Nav.d"
import styles from "./Nav.module.scss"
import { useEffect } from "react"
import { useRouter } from "next/router"

// #endregion Local Imports
export { NavIdx }

export const Nav = (props: INav.IProps): JSX.Element => {
    const router = useRouter()
    const { selIdx, refContainer } = props

    const classes = classNames({
        [styles["nav"]]: true,
        [styles["nav--active"]]: selIdx !== null,
    })
    const touchObj: {
        startTime: number | null
        x: number | null
        y: number | null
    } = {
        startTime: null,
        x: null,
        y: null,
    }
    const handleTouchStart = (e: TouchEvent) => {
        // console.log(e)
        touchObj.startTime = e.timeStamp
        touchObj.x = e.touches[0].clientX
        touchObj.y = e.touches[0].clientY
    }

    const handleTouchEnd = (e: TouchEvent) => {
        const endTime = e.timeStamp
        const endX = e.changedTouches[0].clientX
        const endY = e.changedTouches[0].clientY

        const timeDiff = endTime - (touchObj.startTime || endTime)
        const xDiff = (touchObj.x || endX) - endX
        const yDiff = (touchObj.y || endY) - endY
        // console.log(timeDiff, xDiff, yDiff)
        // console.log(router.pathname)
        if (timeDiff < 200) {
            if (Math.abs(yDiff) < Math.abs(xDiff)) {
                if (50 < xDiff) {
                    console.log("xDiff right")
                    /* right swipe */
                    if (router.pathname === "/works") {
                        router.push("/resume")
                    } else if (router.pathname === "/resume") {
                        router.push("/contact")
                    }
                } else if (xDiff < -50) {
                    console.log("xDiff left")
                    /* left swipe */
                    if (router.pathname === "/resume") {
                        router.push("/works")
                    } else if (router.pathname === "/contact") {
                        router.push("/resume")
                    }
                }
            } else {
                if (refContainer.current) {
                    if (refContainer.current.scrollTop !== 0) {
                        touchObj.startTime = null
                        touchObj.x = null
                        touchObj.y = null
                        return
                    }
                }
                if (50 < yDiff) {
                    console.log("yDiff down")
                    /* right swipe */
                    if (router.pathname === "/") {
                        router.push("/resume")
                    }
                } else if (yDiff < -50) {
                    console.log("yDiff up")
                    /* left swipe */
                    if (router.pathname === "/works" || router.pathname === "/resume" || router.pathname === "/contact") {
                        router.push("/")
                    }
                }
            }
        }
        touchObj.startTime = null
        touchObj.x = null
        touchObj.y = null
    }
    useEffect(() => {
        document.addEventListener("touchstart", handleTouchStart)
        document.addEventListener("touchend", handleTouchEnd)
        return () => {
            document.removeEventListener("touchstart", handleTouchStart)
            document.removeEventListener("touchend", handleTouchEnd)
        }
    }, [router.pathname])
    return (
        <>
            <nav className={classes}>
                <Link href={selIdx === 1 ? "/" : "/works"}>
                    <a
                        className={classNames({
                            [styles["nav__link"]]: true,
                            [styles["nav__link--active"]]: selIdx === 1,
                        })}
                    >
                        WORKS
                    </a>
                </Link>
                <Link href={selIdx === 2 ? "/" : "/resume"}>
                    <a
                        className={classNames({
                            [styles["nav__link"]]: true,
                            [styles["nav__link--active"]]: selIdx === 2,
                        })}
                    >
                        RESUME
                    </a>
                </Link>
                <Link href={selIdx === 3 ? "/" : "/contact"}>
                    <a
                        className={classNames({
                            [styles["nav__link"]]: true,
                            [styles["nav__link--active"]]: selIdx === 3,
                        })}
                    >
                        CONTACT
                    </a>
                </Link>
            </nav>
        </>
    )
}
