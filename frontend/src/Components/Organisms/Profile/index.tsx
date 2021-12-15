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
            <Space vAlign="flex-start" gap="20px">
                <img className={styles["profile__img"]} src="/static/images/profile.jpg" alt="me" />
                <div className={styles["profile__con"]}>
                    <span className={styles["profile__role"]}>1년 9개월차 프론트엔드 개발자, 김찬수입니다.</span>
                    <p className={styles["profile__desc"]}>
                        퍼블리싱과 프론트엔드 개발을 담당하여 다양한 서비스를 개발해왔습니다. 더 나은 가치와 서비스 제공을 목표로 여러 앱과 블로그 등을 개발 및 운영중입니다.
                    </p>
                </div>
            </Space>
            <Button block>이력서 다운로드</Button>
        </div>
    )
}

export { Profile }
