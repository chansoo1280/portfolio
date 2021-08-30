import { IAtom } from "../Atom"

declare namespace ISpace {
    export interface IProps extends IAtom.IProps {
        href?: string
        type?: "Space" | "submit" | "reset"
        className?: string
        onClick?: (event: MouseEvent<HTMLDivElement, MouseEvent>) => void
    }
}

export { ISpace }
