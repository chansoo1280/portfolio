// #region Global Imports
import { combineReducers } from "redux"
// #endregion Global Imports

// #region Local Imports
import { AppReducer } from "./app"
// #endregion Local Imports

export * from "./app"

export const Reducers = combineReducers({
    app: AppReducer,
})
// const persistedReducer = persistReducer(persistConfig, rootReducer)
// export default persistedReducer
