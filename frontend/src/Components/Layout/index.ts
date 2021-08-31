import { Default } from "./Default"
import { Info } from "./Info"
import { ILayout } from "./Layout"
export enum LayoutCode {
    "Default",
    "Info",
}
const TheLayout: {
    [key: number]: ({ children }: ILayout.IProps) => JSX.Element
} = {
    [LayoutCode.Default]: Default,
    [LayoutCode.Info]: Info,
}
export default TheLayout
