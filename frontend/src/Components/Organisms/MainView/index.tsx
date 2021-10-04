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
                <img className={styles["main-view__img"]} src="/static/images/profile.jpg" alt="" />
                <Title as="h1">ChanSoo Kim</Title>
                <span className={styles["main-view__domain"]}>chansoo1280.site</span>
                <Link href="/resume">
                    <a className={styles["main-view__btn--resume"]}>
                        Check My Resume!
                        <i className="xi-angle-down-min"></i>
                    </a>
                </Link>
            </div>
        </>
    )
}
