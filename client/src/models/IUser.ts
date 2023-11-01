import { CurrentLocation } from 'app/redux/slices/locationSlice'

export interface IUser {
    email: string
    userId: string
    savedLocations: CurrentLocation[]
}
