import { RootState } from "./store"

export const currentCity = (state: RootState) => state.locations.currentLocation?.city
export const currentLocationSelector = (state: RootState) => state.locations.currentLocation
export const currentWetherSelector = (state: RootState) => state.weather.currentWeatherData
export const selectDay = (state: RootState) => state.weather.day
export const signUpSelector = (state: RootState) => state.login.signUpState
export const signInSelector = (state: RootState) => state.login.signInState
export const authStatusSelector = (state: RootState) => state.login.authStatus
export const userSelector = (state: RootState) => state.login.user
export const statusSelector = (state: RootState) => state.login.status
export const serverErrorsSelector = (state: RootState) => state.login.serverErrors
