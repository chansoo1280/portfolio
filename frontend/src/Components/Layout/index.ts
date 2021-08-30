import { Default } from "./Default"
import { ILayout } from "./Layout"
export enum LayoutCode {
    "Default",
}
const TheLayout: {
    [key: number]: ({ children, cate_info }: ILayout.IProps) => JSX.Element
} = {
    [LayoutCode.Default]: Default,
}
export default TheLayout
