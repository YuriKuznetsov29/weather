import Container from 'shared/ui/Container/Container'
import { getWetherImage, getWindDirection } from 'helpers/transformData'
import { days, months, weatherDescription } from 'helpers/constants'
import { memo, useState } from 'react'

import styles from './TenDaysWeather.module.scss'

interface DayProps {
    sunrise: string
    sunset: string
    weathercode: number
    tempMax: number
    tempMin: number
    utcOffset: number
    wind: number
    windDir: number
    uvIndex: number
    moi: number
    day: number
    month: number
    week: number
    dailyTemp: number[]
    hourlyWeatherCode: number[]
    dailyTime: string[]
}

const Day = ({
    sunrise,
    sunset,
    weathercode,
    utcOffset,
    moi,
    wind,
    windDir,
    uvIndex,
    tempMax,
    tempMin,
    day,
    month,
    week,
    dailyTemp,
    hourlyWeatherCode,
    dailyTime,
}: DayProps) => {
    const [addDataState, setAddDataState] = useState(false)

    const showAdditionalData = () => {
        setAddDataState(!addDataState)
    }

    const image = getWetherImage(sunrise, sunset, weathercode, utcOffset)
    return (
        <Container>
            <div className={styles.days_container}>
                <div className={styles.days_wrapper} onClick={showAdditionalData}>
                    <div className={styles.day__codeWrapper}>
                        <div className={styles.time}>
                            {days[week]}, {day} {months[month]}
                        </div>
                        <div className={styles.day__code}>{weatherDescription[weathercode]}</div>
                    </div>
                    <div className={styles.data_wrapper}>
                        <i className={`wi ${image} ${styles.icon}`}></i>
                        <div className={styles.temp_wrapper}>
                            <div className={styles.high_temp}>{tempMax}°</div>
                            <div className={styles.low_temp}>{tempMin}°</div>
                        </div>
                    </div>
                </div>
                <div
                    className={`${styles.additionalData_wrapper} ${addDataState && styles.active}`}
                >
                    <div className={styles.currentWeather__data}>
                        <div className={styles.day__data_name}>Ветер</div>
                        <div className={styles.day__data_name}>Влажность</div>
                        <div className={styles.day__data_name}>УФ-индекс</div>
                        <div className={styles.day__data_name}>Восход/заход</div>
                    </div>
                    <div className={styles.currentWeather__values}>
                        <div className={styles.day__data_value}>
                            {wind} км/ч {getWindDirection(windDir)}{' '}
                        </div>
                        <div className={styles.day__data_value}>{moi} %</div>
                        <div className={styles.day__data_value}>{uvIndex}</div>
                        <div className={styles.day__data_value}>
                            {sunrise}, {sunset}
                        </div>
                    </div>
                </div>
                <div className={`${styles.day__dailyTempWrapper} ${addDataState && styles.active}`}>
                    {dailyTemp.map((el: number, i: number) => {
                        return (
                            <div key={i} className={styles.day__dailyTempData}>
                                <div key={i} className={styles.day__dailyTemp}>
                                    {el}°
                                </div>
                                <i
                                    className={`wi ${getWetherImage(
                                        sunrise,
                                        sunset,
                                        hourlyWeatherCode[i],
                                        utcOffset
                                    )} ${styles.hourlyIcon}`}
                                ></i>
                                <div className={styles.hourlyTime}>{dailyTime[i]}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </Container>
    )
}

export default Day
