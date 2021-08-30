// #region Global Imports
// #endregion Global Imports

// #region Local Imports
import { IMainView } from "./MainView"
import styles from "./MainView.module.scss"

// #endregion Local Imports

export const MainView = (props: IMainView.IProps): JSX.Element => {
    return (
        <>
            <div className={styles["main-view"]} {...props}>
                <div className={styles["main-view__img"]}>
                    <img src="" alt="" />
                </div>
                <h1 className={styles["main-view__title"]}>ChanSoo Kim</h1>
                <span>chansoo1280.site</span>
                <button>check my resume!</button>
            </div>
        </>
    )
}
