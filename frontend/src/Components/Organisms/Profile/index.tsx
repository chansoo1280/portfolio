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
            <img className={styles["profile__img"]} src="/static/images/profile.jpg" alt="me" />
            <div className={styles["profile__con"]}>
                <span className={styles["profile__role"]}>FE Developer, 김찬수입니다.</span>
                <p className={styles["profile__desc"]}>UI/UX 개발을 담당하여 다양한 서비스를 개발해왔습니다. 더 나은 사용자 경험과 개발환경을 목표로 일하며, 지금도 계속해서 공부 중입니다.</p>
                <p className={styles["profile__desc"]}></p>
            </div>
        </Space>
    )
}

export { Profile }
