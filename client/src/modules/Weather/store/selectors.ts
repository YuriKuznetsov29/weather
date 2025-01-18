import { RootState } from 'app/providers/StoreProvider/config/store'

export const currentWetherSelector = (state: RootState) => state.weather.currentWeatherData
export const selectDay = (state: RootState) => state.weather.day
