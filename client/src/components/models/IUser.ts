import { CurrentLocation } from "app/slices/locationSlice"

export interface IUser {
    email: string
    // isActivated: boolean
    userId: string
    savedLocations: CurrentLocation[]
}