import { CurrentLocation } from 'modules/Locations'

export interface IUser {
    email: string
    userId: string
    savedLocations: CurrentLocation[]
}
