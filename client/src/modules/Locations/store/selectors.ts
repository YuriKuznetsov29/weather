import { RootState } from 'app/providers/StoreProvider/config/store'

export const currentCity = (state: RootState) => state.locations.currentLocation?.city
export const currentLocationSelector = (state: RootState) => state.locations.currentLocation
