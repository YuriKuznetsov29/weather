import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getWetherDaily } from "services/getData"

import { WeatherData, getCurrentDate } from "services/tranformData"

export const loadWeather = createAsyncThunk<WeatherData, RequestWetherData, { state: { weather: WeatherSlice } }>(
    "weather/load-weather",
    ({ lat, lon, timezone, day }: RequestWetherData) => {
        return getWetherDaily(lat, lon, timezone, day)
    },
    {
        condition: (_, { getState }) => {
            const { status } = getState().weather
            if (status === "loading") {
                return false
            }
        },
    }
)

interface RequestWetherData {
    lat: string | number
    lon: string | number
    timezone: string
    day?: string
}

type WeatherSlice = {
    currentWeatherData: WeatherData | null
    day: Day
    status: "idle" | "loading" | "finished" | "error"
}

type Day = 'today' | 'tomorrow'

const initialState: WeatherSlice = {
    currentWeatherData: null,
    day: 'today',
    status: "idle",
}

const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {
        clearDetails: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadWeather.pending, (state) => {
                state.status = "loading"
            })
            .addCase(loadWeather.rejected, (state) => {
                state.status = "error"
            })
            .addCase(loadWeather.fulfilled, (state, action) => {
                state.status = "finished"
                state.currentWeatherData = action.payload
            })
    },
})

export const { clearDetails } = weatherSlice.actions
export const weatherReducer = weatherSlice.reducer
