// #region Global Imports
import { Space, Title, TitleProps } from "@Components"
import React, { ReactNode } from "react"
import classNames from "classnames"
// #endregion Global Imports

// #region Local Imports
import styles from "./SkillList.module.scss"
// #endregion Local Imports
interface Props {
    children?: ReactNode
}
const InternalSkillList = (props: Props): JSX.Element => {
    return <ul className={styles["skill-list"]} {...props} />
}
interface ItemProps {
    children?: ReactNode
    isSub?: boolean
}
const SkillListItem = (props: ItemProps): JSX.Element => {
    const { isSub, ...rest } = props
    return (
        <li
            className={classNames(styles["skill-list__item"], {
                [styles["skill-list__item--sub"]]: isSub,
            })}
            {...rest}
        />
    )
}

interface CompoundedComponent extends React.ForwardRefExoticComponent<Props> {
    Item: typeof SkillListItem
}
const SkillList = InternalSkillList as CompoundedComponent

SkillList.displayName = "SkillList"
SkillList.Item = SkillListItem
export default SkillList
