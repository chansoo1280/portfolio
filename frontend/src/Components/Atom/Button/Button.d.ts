import { IAtom } from "../Atom"

declare namespace IButton {
    export interface IProps extends IAtom.IProps {
        href?: string
        type?: "button" | "submit" | "reset"
        size?: "large" | "middle" | "small"
        className?: string
        flex?: boolean
        onClick?: (event: MouseEvent<HTMLDivElement, MouseEvent>) => void
    }
}

export { IButton }
