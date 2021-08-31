// #region Global Imports
// #endregion Global Imports

// #region Local Imports
import styles from "./Footer.module.scss"

// #endregion Local Imports

interface Props {
    children?: React.ReactNode
    centerTitle?: boolean
}
export const Footer = (props: Props): JSX.Element => {
    return (
        <>
            <footer className={styles["footer"]}>
                <span>All Content © Copyright ChanSoo Kim 2021</span>
            </footer>
        </>
    )
}
