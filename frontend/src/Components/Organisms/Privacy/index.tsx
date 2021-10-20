// #region Global Imports
// #endregion Global Imports

// #region Local Imports
import styles from "./Privacy.module.scss"
// #endregion Local Imports
interface Props {
    children?: React.ReactNode
}
const Privacy = (props: Props): JSX.Element => {
    return (
        <>
            <div className={styles["privacy"]} {...props} />
        </>
    )
}
export default Privacy
