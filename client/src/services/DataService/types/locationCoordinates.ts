
export interface ILocation {
    latitude: number
    longitude: number
    name: string
    timezone: string
    country: string
    country_code: string
    id: string
}

export interface LocationCoordinates {
    results: ILocation[]
}
