import { createSlice } from '@reduxjs/toolkit'

export type CurrentLocation = {
    lat: number
    lon: number
    city: string
    timezone: string
    country: string
}

type RecentLocations = {
    locations: CurrentLocation[]
}

type LocationSlice = {
    currentLocation: CurrentLocation | null
    recentLocations: RecentLocations | null
}

const initialState: LocationSlice = {
    currentLocation: null,
    recentLocations: null,
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
})

export const { setCurrentLocation, setRecentLocations } = locationSlice.actions
export const locationsReducer = locationSlice.reducer
