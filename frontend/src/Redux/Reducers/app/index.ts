// #region Global Imports
import { ActionConsts } from "@Definitions"
import { IAction } from "@Redux"
// #endregion Global Imports

// #region Local Imports
import { IAppPage } from "./App"
// #endregion Local Imports

export type { IAppPage }

const INITIAL_STATE: IAppPage.IStateProps = {
    sel_cate: null,
    sel_theme: null,
    sel_nav: null,
}

type IPayload = IAppPage.Actions.IPayload
export const AppReducer = (state = INITIAL_STATE, action: IAction<IPayload>): IAppPage.IStateProps => {
    switch (action.type) {
        case ActionConsts.App.SetSelCateReducer:
            return {
                ...state,
                sel_cate: action.payload,
            }
        case ActionConsts.App.SetSelThemeReducer:
            return {
                ...state,
                sel_theme: action.payload,
            }
        case ActionConsts.App.SetSelNavReducer:
            return {
                ...state,
                sel_nav: action.payload,
            }
        case ActionConsts.App.ResetReducer:
            return INITIAL_STATE

        default:
            return state
    }
}
