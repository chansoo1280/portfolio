// #region Global Imports
import Link from "next/link"
// #endregion Global Imports

// #region Local Imports
import styles from "./MainView.module.scss"
import { Title } from "@Components"
// #endregion Local Imports
interface Props {
    children?: React.ReactNode
}
export const MainView = (props: Props): JSX.Element => {
    return (
        <>
            <div className={styles["main-view"]} {...props}>
                <div className={styles["main-view__img-wrap"]}>
                    <img className={styles["main-view__img"]} src="/static/images/profile.jpg" alt="" />
                </div>
                <Title className={styles["main-view__title"]} as="h1">
                    김찬수
                </Title>
                <span className={styles["main-view__sub-title"]}>FE-DEV PORTFOLIO</span>
                {/* <Link href="/resume">
                    <a className={styles["main-view__btn--resume"]}>
                        Check My Resume!
                        <i className="xi-angle-down-min"></i>
                    </a>
                </Link> */}
            </div>
        </>
    )
}
