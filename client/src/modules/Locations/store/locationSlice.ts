import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { getCurrentLocation } from '../api/getCurrentLocation'
export type CurrentLocation = {
    lat: number
    lon: number
    city: string
    timezone: string
    country: string
}

export type RecentLocations = {
    locations: CurrentLocation[]
}

export type LocationSlice = {
    currentLocation: CurrentLocation | null
    recentLocations: RecentLocations | null
    loading: boolean
}

const initialState: LocationSlice = {
    currentLocation: null,
    recentLocations: null,
    loading: false,
}

const locationSlice = createSlice({
    name: 'locations',
    initialState,
    reducers: {
        setCurrentLocation: (state, action) => {
            state.currentLocation = action.payload
        },
        setRecentLocations: (state, action) => {
            state.recentLocations = action.payload
        },
    },
     extraReducers: (builder) => {
        builder
            .addCase(getCurrentLocation.pending, (state) => {
                state.loading = true
            })
            .addCase(getCurrentLocation.rejected, (state) => {
                state.loading = false
            })
            .addCase(getCurrentLocation.fulfilled, (state, action: PayloadAction<CurrentLocation>) => {
                state.currentLocation = action.payload
                state.loading = false
            })
    },
})

export const { setCurrentLocation, setRecentLocations } = locationSlice.actions
export const locationsReducer = locationSlice.reducer
