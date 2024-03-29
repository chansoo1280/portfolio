// #region Global Imports
import Link from "next/link"
import classNames from "classnames"

// #endregion Global Imports// #region Local Imports

import { INav } from "./Nav.d"
import styles from "./Nav.module.scss"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

// #endregion Local Imports

export const Nav = (props: INav.IProps): JSX.Element => {
    const router = useRouter()
    const { refContainer } = props

    const [selIdx, setSelIdx] = useState<number | null>(null)

    const classes = classNames(styles["nav"], {
        [styles["nav--active"]]: selIdx !== null,
        [styles["nav--hide"]]: router.pathname !== "/works" && router.pathname !== "/resume" && router.pathname !== "/contact" && router.pathname !== "/",
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
        // if (e.target && (e.target as any).localName === "canvas") return false
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
                if (refContainer.current && refContainer.current.scrollTop !== 0) {
                    touchObj.startTime = null
                    touchObj.x = null
                    touchObj.y = null
                    return
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
    const handleWheel = (e: WheelEvent) => {
        if (router.pathname === "/") {
            if (e.deltaY >= 0) {
                router.push("/resume")
            }
        } else if (router.pathname === "/resume") {
            if (e.deltaY < 0) {
                router.push("/")
            }
        }
    }
    useEffect(() => {
        if (router.pathname === "/") {
            setSelIdx(null)
        } else if (router.pathname === "/works") {
            setSelIdx(1)
        } else if (router.pathname === "/resume") {
            setSelIdx(2)
        } else if (router.pathname === "/contact") {
            setSelIdx(3)
        }
        return () => {
            setSelIdx(null)
        }
    }, [router.pathname])
    useEffect(() => {
        document.addEventListener("touchstart", handleTouchStart)
        document.addEventListener("touchend", handleTouchEnd)
        document.addEventListener("wheel", handleWheel)
        return () => {
            document.removeEventListener("touchstart", handleTouchStart)
            document.removeEventListener("touchend", handleTouchEnd)
            document.removeEventListener("wheel", handleWheel)
        }
    }, [router.pathname, refContainer])
    return (
        <>
            <nav className={classes}>
                <div className={classNames(styles["nav__con"])}>
                    <Link href={selIdx === 1 ? "/" : "/works"}>
                        <a
                            className={classNames(styles["nav__link"], {
                                [styles["nav__link--active"]]: selIdx === 1,
                            })}
                        >
                            <span className={classNames(styles["nav__text"])}>WORKS</span>
                        </a>
                    </Link>
                    <Link href={selIdx === 2 ? "/" : "/resume"}>
                        <a
                            className={classNames(styles["nav__link"], {
                                [styles["nav__link--active"]]: selIdx === 2,
                            })}
                        >
                            <span
                                className={classNames(styles["nav__text"], {
                                    [styles["nav__text--center"]]: selIdx === null,
                                })}
                            >
                                RESUME
                            </span>
                        </a>
                    </Link>
                    <Link href={selIdx === 3 ? "/" : "/contact"}>
                        <a
                            className={classNames(styles["nav__link"], {
                                [styles["nav__link--active"]]: selIdx === 3,
                            })}
                        >
                            <span className={classNames(styles["nav__text"])}>CONTACT</span>
                        </a>
                    </Link>
                </div>
            </nav>
        </>
    )
}
