import { RootState } from 'app/providers/StoreProvider/config/store'

export const currentWetherSelector = (state: RootState) => state.weather.currentWeatherData
export const weatherDataStatus = (state: RootState) => state.weather.status
export const selectDay = (state: RootState) => state.weather.day
