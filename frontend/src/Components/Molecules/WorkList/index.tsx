// #region Global Imports
import { Space, Title, TitleProps } from "@Components"
import React, { ReactNode } from "react"
// #endregion Global Imports

// #region Local Imports
import styles from "./WorkList.module.scss"
// #endregion Local Imports
interface Props {
    children?: ReactNode
}
const InternalWorkList = (props: Props): JSX.Element => {
    return <ol className={styles["work-list"]} {...props} />
}
interface ItemProps {
    children?: ReactNode
    onClick?: () => void
    TitleProps?: TitleProps
    date?: string
    ImgProps?: {
        src: string
        alt: string
    }
}
const WorkListItem = (props: ItemProps): JSX.Element => {
    const { TitleProps, ImgProps, date, ...rest } = props
    return (
        <li className={styles["work-list__item"]} {...rest}>
            <Space direction="column" vAlign="flex-start">
                <Title className={styles["work-list__title"]} {...TitleProps} />
                <span className={styles["work-list__date"]}>{date}</span>
            </Space>
            <img className={styles["work-list__img"]} {...ImgProps} />
        </li>
    )
}

interface CompoundedComponent extends React.ForwardRefExoticComponent<Props> {
    Item: typeof WorkListItem
}
const WorkList = InternalWorkList as CompoundedComponent

WorkList.displayName = "WorkList"
WorkList.Item = WorkListItem
export default WorkList
