import { RootState } from "./store"

export const currentCity = (state: RootState) => state.locations.currentLocation?.city
export const currentLocation = (state: RootState) => state.locations.currentLocation
export const currentWether = (state: RootState) => state.weather.currentWeatherData
