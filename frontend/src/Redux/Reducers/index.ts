// #region Global Imports
import { combineReducers } from "@reduxjs/toolkit"
// #endregion Global Imports

// #region Local Imports
import appReducer from "./app"
// #endregion Local Imports

export * from "./app"

const rootReducer = combineReducers({
    appReducer,
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>
