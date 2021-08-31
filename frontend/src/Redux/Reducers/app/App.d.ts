declare namespace IAppPage {
    export type typeSel = number | null

    export interface IStateProps {
        sel_cate: typeSel
        sel_theme: typeSel
        sel_nav: typeSel
    }

    namespace Actions {
        export type IPayload = typeSel
    }
}

export { IAppPage }
