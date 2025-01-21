import { createSlice } from '@reduxjs/toolkit'
import { WeatherData } from 'helpers/transformData'
import { loadWeather } from '../api/loadWeather'

export interface RequestWetherData {
    lat: string | number
    lon: string | number
    timezone: string
    day?: string
}

export type WeatherSlice = {
    currentWeatherData: WeatherData | null
    day: Days
    status: 'idle' | 'loading' | 'finished' | 'error'
}

export type Days = 'today' | 'tomorrow'

const initialState: WeatherSlice = {
    currentWeatherData: null,
    day: 'today',
    status: 'idle',
}

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        clearDetails: () => initialState,
        setDay: (state, action) => {
            state.day = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadWeather.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(loadWeather.rejected, (state) => {
                state.status = 'error'
            })
            .addCase(loadWeather.fulfilled, (state, action) => {
                state.status = 'finished'
                state.currentWeatherData = action.payload
            })
    },
})

export const { clearDetails, setDay } = weatherSlice.actions
export const weatherReducer = weatherSlice.reducer
