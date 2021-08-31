// #region Global Imports
import { Dispatch } from "redux"
// #endregion Global Imports

// #region Local Imports
import { ActionConsts } from "@Definitions"
// #endregion Local Imports

// #region Interface Imports
import { IAppPage } from "@Reducers"
import { IAction } from "@Redux"
import { Action } from "redux"
// #endregion Interface Imports

export const AppActions = {
    // Map: (payload: {}) => ({
    //     payload,
    //     type: ActionConsts.App.SetReducer,
    // }),

    Reset: (): Action => ({
        type: ActionConsts.App.ResetReducer,
    }),

    SetSelCate: (payload: IAppPage.Actions.IPayload): IAction<IAppPage.Actions.IPayload> => ({
        payload: payload,
        type: ActionConsts.App.SetSelCateReducer,
    }),

    SetSelNav: (payload: IAppPage.Actions.IPayload): IAction<IAppPage.Actions.IPayload> => ({
        payload: payload,
        type: ActionConsts.App.SetSelNavReducer,
    }),
}
