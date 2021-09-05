import { Ref } from "react"

declare namespace ILayout {
    export interface IProps {
        children?: React.ReactNode
        refContainer?: Ref
    }
}

export { ILayout }
