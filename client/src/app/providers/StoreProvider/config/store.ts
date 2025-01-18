import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit'
import { weatherReducer } from 'modules/Weather'
import { loginReducer } from 'modules/Authorization'
import { locationsReducer } from 'modules/Locations'

const rootReducer = combineReducers({
    weather: weatherReducer,
    locations: locationsReducer,
    login: loginReducer,
})

export const store = configureStore({
    reducer: rootReducer,
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>
