import { RootState } from "./store"

export const currentCity = (state: RootState) => state.locations.currentLocation?.city
export const currentLocation = (state: RootState) => state.locations.currentLocation
export const currentWether = (state: RootState) => state.weather.currentWeatherData
export const selectDay = (state: RootState) => state.weather.day
export const signUp = (state: RootState) => state.login.signUpState
export const signIn = (state: RootState) => state.login.signInState
