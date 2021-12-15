// #region Global Imports
import className from "classnames"
// #endregion Global Imports

// #region Local Imports
import { Button, Space, Title } from "@Components"
import styles from "./TimeLine.module.scss"
// #endregion Local Imports

// interface Props {
// }
export const TimeLine = (): JSX.Element => {
    return (
        <>
            <Space padding="10px" as="ol" direction="column" vAlign="flex-start">
                <Space as="li" direction="column" vAlign="flex-start">
                    <Title as="h3">2021-12</Title>
                    <ul>
                        <Space as="li" direction="column" vAlign="flex-start" className={styles["time-line__item"]}>
                            <Title as="h4">[KIYO - 통합계정관리] 앱 출시</Title>
                            <img src="" alt="" />
                            <ul>
                                <li>* asd</li>
                                <li>* asd</li>
                            </ul>
                            <Button>자세히보기</Button>
                        </Space>
                    </ul>
                </Space>
                <Space as="li" direction="column" vAlign="flex-start">
                    <Title as="h3">2021-12</Title>
                    <ul>
                        <Space as="li" direction="column" vAlign="flex-start" className={styles["time-line__item"]}>
                            <Title as="h4">[알고싶은 서울물가] 앱 출시</Title>
                            <img src="" alt="" />
                            <ul>
                                <li>* asd</li>
                                <li>* asd</li>
                            </ul>
                            <Button>자세히보기</Button>
                        </Space>
                    </ul>
                </Space>
            </Space>
        </>
    )
}
