// #region Global Imports
// #endregion Global Imports

// #region Local Imports
import styles from "./Footer.module.scss"

// #endregion Local Imports

// interface Props {
//     children?: React.ReactNode
// }
export const Footer = (): JSX.Element => {
    return (
        <>
            <footer className={styles["footer"]}>
                <span>All Content © Copyright ChanSoo Kim 2021</span>
            </footer>
        </>
    )
}
