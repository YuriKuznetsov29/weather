import { createAsyncThunk } from '@reduxjs/toolkit'
import { getWetherDaily } from 'services/DataService/getData'
import { WeatherData } from 'helpers/transformData'
import { RequestWetherData, WeatherSlice } from '../store/weatherSlice'

export const loadWeather = createAsyncThunk<
    WeatherData,
    RequestWetherData,
    { state: { weather: WeatherSlice }; rejectValue: string }
>(
    'weather/load-weather',
    async ({ lat, lon, timezone, day }: RequestWetherData, { rejectWithValue }) => {
        try {
            return await getWetherDaily(lat, lon, timezone, day)
        } catch (error) {
            return rejectWithValue('error')
        }
    },
    {
        condition: (_, { getState }) => {
            const { status } = getState().weather
            if (status === 'loading') {
                return false
            }
        },
    }
)
