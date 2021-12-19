// #region Global Imports
import React, { ReactNode } from "react"
// #endregion Global Imports

// #region Local Imports
import { Button, Space } from "@Components"
import styles from "./Profile.module.scss"
// #endregion Local Imports
interface Props {
    children?: ReactNode
}
const Profile: React.FunctionComponent<Props> = (props) => {
    const {} = props
    return (
        <div className={styles["profile"]}>
            <div className={styles["profile__img-wrap"]}>
                <img className={styles["profile__img"]} src="/static/images/profile.jpg" alt="me" />
                <span className={styles["profile__img-text"]}>For better value and service</span>
            </div>
            <div className={styles["profile__con-wrap"]}>
                <div className={styles["profile__con"]}>
                    <Space margin="0 0 6px" vAlign="flex-end" gap="7px">
                        <span className={styles["profile__name"]}>김찬수</span>
                        <span className={styles["profile__name-en"]}>ChanSoo Kim</span>
                    </Space>
                    <span className={styles["profile__role"]}>1년 9개월차 프론트엔드 개발자</span>
                    <Button href="/file/resume.pdf" download block type="primary">
                        이력서 다운로드
                    </Button>
                </div>
            </div>
        </div>
    )
}

export { Profile }
