declare namespace INav {
    export interface IProps {
        children?: React.ReactNode
        selIdx: null
    }
}
export const NavIdx = {
    WORKS: 1,
    RESUME: 2,
    CONTACT: 3,
} as const
export type NavIdx = typeof NavIdx[keyof typeof NavIdx]

export { INav }