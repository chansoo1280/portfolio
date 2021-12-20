// #region Local Imports
import { createAction, ActionType, createReducer } from "typesafe-actions"
// #endregion Local Imports

// #region Interface Imports
// #endregion Interface Imports

// 상태의 타입 선언
interface AppReducer {
    sel_theme: number | null
}
// 상태 초기화
const initialState: AppReducer = {
    sel_theme: null,
}

// 액션타입 선언
export const AppActionConsts = {
    RESET_APP: "appReducer/RESET_APP",
    SET_THEME: "appReducer/SET_THEME",
}

// 액션함수 선언
export const resetApp = createAction(AppActionConsts.RESET_APP)()
export const setTheme = createAction(AppActionConsts.SET_THEME)<typeof initialState.sel_theme>()

// 액션 객체타입
export const AppActions = { resetApp, setTheme }

// 리듀서 추가
const appReducer = createReducer<AppReducer, ActionType<typeof AppActions>>(initialState, {
    [AppActionConsts.RESET_APP]: () => initialState,
    [AppActionConsts.SET_THEME]: (state, action: any) => ({
        ...state,
        sel_theme: action.payload,
    }),
})
export default appReducer
