import { RootState } from "app/redux/store"

export const currentCity = (state: RootState) => state.locations.currentLocation?.city
export const currentLocationSelector = (state: RootState) => state.locations.currentLocation