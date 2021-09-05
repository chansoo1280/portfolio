import { Default } from "./Default"
import { default as Info } from "./Info"
import { ILayout } from "./Layout"
export enum LayoutCode {
    "Default",
    "Info",
}
const TheLayout: {
    [key: number]: ({ children }: ILayout.IProps) => any
} = {
    [LayoutCode.Default]: Default,
    [LayoutCode.Info]: Info,
}
export default TheLayout
