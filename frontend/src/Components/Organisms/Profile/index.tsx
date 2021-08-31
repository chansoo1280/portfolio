// #region Global Imports
import React, { ReactNode } from "react"
// #endregion Global Imports

// #region Local Imports
import { Space } from "@Components"
import styles from "./Profile.module.scss"
// #endregion Local Imports
interface Props {
    children?: ReactNode
}
const Profile: React.FunctionComponent<Props> = (props) => {
    const {} = props
    return (
        <Space>
            <img className={styles["profile__img"]} src="" alt="asd" />
            <div className={styles["profile__con"]}>
                <span className={styles["profile__role"]}>FE Developer</span>
            </div>
        </Space>
    )
}

export { Profile }
