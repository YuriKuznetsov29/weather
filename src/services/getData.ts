/* eslint-disable react-hooks/rules-of-hooks */
import { useHttp } from "hooks/useHttp"
import { WeatherData, getCurrentDate, getLastDate, transformWeatherData } from "./tranformData"

export function getLocation() {
    return useHttp("https://api.ipgeolocation.io/ipgeo?apiKey=17a8d753063e4a20a9531fe3638de576")
}

export function getCoordinateLocation(city: string) {
    return useHttp(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=5&language=ru`)
}

export function getWetherDaily(lat: string | number, lon: string | number, timezone: string, day: string = getCurrentDate()) {
    return transformWeatherData(
        useHttp(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,precipitation,visibility,precipitation_probability,apparent_temperature,weathercode,pressure_msl,surface_pressure,windspeed_10m,winddirection_10m,uv_index&daily=weathercode,uv_index_max,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant&timezone=${timezone}&start_date=${day}&end_date=${getLastDate()}`
        )
    )
}
