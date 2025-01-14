import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit'
import { weatherReducer } from './slices/weatherSlice'
import { locationsReducer } from './slices/locationSlice'
import { loginReducer } from 'modules/Authorization'

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
