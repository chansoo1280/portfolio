// #region Global Imports
import React, { ReactNode, RefObject, useEffect, useState } from "react"
import classNames from "classnames"
// #endregion Global Imports

// #region Local Imports
import styles from "./TopBtn.module.scss"
// #endregion Local Imports

interface Props {
    children?: ReactNode
    container: RefObject<HTMLDivElement>
}

const TopBtn: React.FunctionComponent<Props> = (props) => {
    const { container } = props
    const [scrollTop, setScrollTop] = useState(0)
    useEffect(() => {
        const el = container.current
        if (el === null) return
        el.addEventListener("scroll", (e: Event) => {
            const target = e.target as HTMLDivElement
            setScrollTop(target.scrollTop || 0)
        })
    }, [container.current])
    const classes = classNames({
        [styles["top-btn"]]: true,
        [styles[`top-btn--show`]]: 40 < scrollTop,
    })
    return (
        <button
            onClick={() => {
                const el = container.current
                if (el === null) return
                el.scrollTo({
                    top: 0,
                    behavior: "smooth",
                })
            }}
            className={classes}
        >
            <i className="xi-arrow-top"></i>
            <span className="ir">상단으로 이동</span>
        </button>
    )
}

export { TopBtn }
