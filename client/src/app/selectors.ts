import { RootState } from "./store"

export const currentCity = (state: RootState) => state.locations.currentLocation?.city
export const currentLocation = (state: RootState) => state.locations.currentLocation
export const currentWether = (state: RootState) => state.weather.currentWeatherData
export const selectDay = (state: RootState) => state.weather.day
export const signUpSelector = (state: RootState) => state.login.signUpState
export const signInSelector = (state: RootState) => state.login.signInState
export const authStatusSelector = (state: RootState) => state.login.authStatus
export const userSelector = (state: RootState) => state.login.user