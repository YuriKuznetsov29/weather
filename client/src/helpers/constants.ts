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

export const weathernightClasses: WetherCodes = {
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

export const days = ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"]
export const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']