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

type IMapResponse = IAppPage.Actions.IMapResponse
type ISetSelCatePayload = IAppPage.Actions.ISetSelCatePayload
type ISetSelThemePayload = IAppPage.Actions.ISetSelThemePayload
type ISetSelNavPayload = IAppPage.Actions.ISetSelNavPayload

export const AppReducer = (state = INITIAL_STATE, action: IAction<IMapResponse>): IAppPage.IStateProps => {
    switch (action.type) {
        case ActionConsts.App.SetSelCateReducer:
            action = action as IAction<ISetSelCatePayload>
            return {
                ...state,
                sel_cate: action.payload,
            }
        case ActionConsts.App.SetSelThemeReducer:
            action = action as IAction<ISetSelThemePayload>
            return {
                ...state,
                sel_theme: action.payload,
            }
        case ActionConsts.App.SetSelNavReducer:
            action = action as IAction<ISetSelNavPayload>
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
