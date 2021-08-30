import { NavIdx } from "@Components/Organisms/Nav/Nav"

declare namespace IAppPage {
    // export interface InitialProps {
    //     namespacesRequired: string[]
    // }

    export interface IStateProps {
        sel_cate: number | null
        sel_theme: number | null
        sel_nav: number | null
    }

    namespace Actions {
        export type IMapResponse = ISetSelCatePayload | ISetSelThemePayload

        export type ISetSelCatePayload = number | null
        export type ISetSelThemePayload = number | null
        export type ISetSelNavPayload = number | null
    }
}

export { IAppPage }
