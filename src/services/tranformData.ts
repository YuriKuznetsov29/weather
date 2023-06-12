export const getLastDate = () => {
    const date = new Date()
    date.setDate(date.getDate() + 15)
    return date.toLocaleDateString().replace(/(\d{2})\.(\d{2})\.(\d{4})/g, "$3-$2-$1")
}

export const getCurrentDate = () => {
    return new Date().toLocaleDateString().replace(/(\d{2})\.(\d{2})\.(\d{4})/g, "$3-$2-$1")
}

export function getTimeWithUtcOffset(offset: number) {
    const date = new Date()
    const utcDate = new Date(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds(),
        date.getUTCMilliseconds()
    )
    utcDate.setSeconds(offset)
    const time = utcDate.toLocaleTimeString().slice(0, -3)
    const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"]
    const month = utcDate.getMonth()
    const day = utcDate.getDate()
    const hour = utcDate.getHours()
    const hours = time.slice(0, 2)
    const minutes = time.slice(3, 5)
    const modTime = +hours + (+minutes * (10 / 6)) / 100
    return { time, modTime, month, day, hour }
}

export interface WeatherData {
    currentTemp: number
    currentMoi: number
    currentPrecipitation: number
    wind: number
    sunrise: string
    sunset: string
    weathercode: number
    dailyTemp: number[]
    dailyMoi: number[]
    dailyPrecipitation: number[]
    dailyPrecipitationProb: number[]
    dailyWind: number[]
    dailyWindDir: number[]
    dailyPressure: number[]
    dailyTime: string[]
    utcOffset: number
    currentTempRound: number
    realFeel: number
    dewpoint: number
    pressure: number
    uvIndex: number
    precipProb: number
    visibility: number
    lon: number
}

export const transformWeatherData = async (data: any): Promise<WeatherData> => {
    return data.then((res: any) => {
        console.log(res)
        const { hour } = getTimeWithUtcOffset(res.utc_offset_seconds)
        let result = {
            currentTemp: res.hourly.temperature_2m[hour],
            currentMoi: res.hourly.relativehumidity_2m[hour],
            currentPrecipitation: res.hourly.precipitation[hour],
            wind: res.hourly.windspeed_10m[hour],
            sunrise: res.daily.sunrise[0].slice(-5),
            sunset: res.daily.sunset[0].slice(-5),
            weathercode: res.hourly.weathercode[hour],
            dailyTemp: res.hourly.temperature_2m.slice(0, 24),
            dailyMoi: res.hourly.relativehumidity_2m.slice(0, 24),
            dailyPrecipitation: res.hourly.precipitation.slice(0, 24),
            dailyPrecipitationProb: res.hourly.precipitation_probability.slice(0, 24),
            dailyWind: res.hourly.windspeed_10m.slice(0, 24).map((el: number) => Math.round(el)),
            dailyWindDir: res.hourly.winddirection_10m.slice(0, 24),
            dailyPressure: res.hourly.pressure_msl.slice(0, 24).map((el: number) => Math.round(el)),
            dailyTime: res.hourly.time.slice(0, 24).map((el: string) => el.slice(-5)),
            utcOffset: res.utc_offset_seconds,
            currentTempRound: Math.round(res.hourly.temperature_2m[hour]),
            realFeel: Math.round(res.hourly.apparent_temperature[hour]),
            dewpoint: res.hourly.dewpoint_2m[hour],
            pressure: res.hourly.pressure_msl[hour],
            uvIndex: res.hourly.uv_index[hour],
            precipProb: res.hourly.precipitation_probability[hour],
            visibility: res.hourly.visibility[hour],
            lon: res.longitude,
        }
        return result
    })
}

interface WetherCodes {
    [key: string]: string
}

export const weatherDescription: WetherCodes = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog and depositing rime fog",
    48: "Fog and depositing rime fog",
    51: "Drizzle: light",
    53: "Drizzle: moderate",
    55: "Drizzle: dense intensity",
    56: "Freezing Drizzle: ligth",
    57: "Freezing Drizzle: dense intensity",
    61: "Rain: slight",
    63: "Rain: moderate",
    65: "Rain: heavy intensity",
    66: "Freezing Rain: light",
    67: "Freezing Rain: heavy intensity",
    71: "Snow fall: slight",
    73: "Snow fall: moderate",
    75: "Snow fall: heavy intensity",
    77: "Snow grains",
    80: "Rain showers: slight",
    81: "Rain showers: moderate",
    82: "Rain showers: violent",
    85: "Snow showers slight",
    86: "Snow showers heavy",
    95: "Thunderstorm: Slight or moderate",
    96: "Thunderstorm with slight",
    99: "Thunderstorm with heavy hail",
}

export const weatherDayClasses: WetherCodes = {
    0: "wi-day-sunny",
    1: "wi-day-sunny",
    2: "wi-day-cloudy",
    3: "wi-cloudy",
    45: "wi-day-fog",
    48: "wi-day-fog",
    51: "wi-day-showers",
    53: "wi-day-showers",
    55: "wi-day-showers",
    56: "Freezing Drizzle: ligth",
    57: "Freezing Drizzle: dense intensity",
    61: "wi-day-showers",
    63: "wi-day-showers",
    65: "wi-rain",
    66: "wi-day-rain-mix",
    67: "wi-day-rain-mix",
    71: "wi-day-snow",
    73: "wi-day-snow",
    75: "wi-snow",
    77: "wi-day-hail",
    80: "wi-day-showers",
    81: "wi-day-showers",
    82: "wi-showers",
    85: "wi-day-snow",
    86: "wi-sandstorm",
    95: "wi-day-storm-showers",
    96: "wi-day-storm-showers",
    99: "wi-storm-showers",
}

export const weatherNigthClasses: WetherCodes = {
    0: "wi-night-clear",
    1: "wi-night-clear",
    2: "wi-night-alt-cloudy",
    3: "wi-cloudy",
    45: "wi-night-fog",
    48: "wi-night-fog",
    51: "wi-night-alt-showers",
    53: "wi-night-alt-showers",
    55: "wi-night-alt-showers",
    56: "Freezing Drizzle: ligth",
    57: "Freezing Drizzle: dense intensity",
    61: "wi-night-alt-showers",
    63: "wi-night-alt-showers",
    65: "wi-rain",
    66: "wi-night-rain-mix",
    67: "wi-night-rain-mix",
    71: "wi-night-alt-snow-wind",
    73: "wi-night-alt-snow-wind",
    75: "wi-snow",
    77: "wi-night-alt-hail",
    80: "wi-night-alt-showers",
    81: "wi-night-alt-showers",
    82: "wi-showers",
    85: "wi-night-alt-snow-wind",
    86: "wi-sandstorm",
    95: "wi-night-storm-showers",
    96: "wi-night-storm-showers",
    99: "wi-storm-showers",
}

export function getWetherImage(sunrise: string, sunset: string, code: number, offset: number): string {
    const { modTime } = getTimeWithUtcOffset(offset)
    const sunriseMod = +sunrise.slice(0, 2) + (+sunrise.slice(3, 5) * (10 / 6)) / 100
    const sunsetMod = +sunset.slice(0, 2) + (+sunset.slice(3, 5) * (10 / 6)) / 100

    if (modTime > sunriseMod && sunriseMod < sunsetMod) {
        return weatherDayClasses[code]
    } else {
        return weatherNigthClasses[code]
    }
}
