import Container from 'shared/ui/Container/Container'
import DayNightTemp from 'components/DayNightTemp/DayNightTemp'
import { getWetherImage, getTimeWithUtcOffset, CurrentWeather } from 'helpers/transformData'
import { months, weatherDescription } from 'helpers/constants'

import styles from './CurrentWeather.module.scss'
import { memo } from 'react'

interface TodayProps {
    weather: CurrentWeather
    date: {
        time: string
        month: number
        day: number
    }
}

function compareFunction(prevProps: TodayProps, nextProps: TodayProps): boolean {
    if (JSON.stringify(prevProps) === JSON.stringify(nextProps)) {
        return true
    }
    return false
}

const TodayWeather = memo(({ weather, date }: TodayProps) => {
    const {
        sunrise,
        sunset,
        weathercode,
        utcOffset,
        currentMoi,
        dewpoint,
        pressure,
        uvIndex,
        precipProb,
        visibility,
        currentTemp,
        realFeel,
        tempMax,
        tempMin,
    } = weather
    const { time, month, day } = date
    const image = getWetherImage(sunrise, sunset, weathercode, utcOffset)

    return (
        <div className={styles.currentWeather} id="currentWeather">
            <Container>
                <div className={styles.currentWeather__wrapper}>
                    <div className={styles.currentWeather__data}>
                        <div className={styles.currentWeather__data_time}>
                            {day} {months[month]}, {time}
                        </div>
                        <DayNightTemp dayTemp={tempMax} nightTemp={tempMin} />
                        <div className={styles.currentWeather__data_temp}>
                            {currentTemp}
                            <div className={styles.celsius}>°C</div>
                        </div>
                        <div className={styles.currentWeather__data_Feeltemp}>
                            Ощущается как {realFeel}°C
                        </div>
                    </div>
                    <div className={styles.currentWeather__code}>
                        <div>
                            <i className={`wi ${image} ${styles.code_icon}`}></i>
                        </div>
                        <div className={styles.currentWeather__codeValue}>
                            {weatherDescription[weathercode]}
                        </div>
                    </div>
                </div>
            </Container>
            <Container>
                <div className={styles.currentWeather__nowTitle}>Сейчас</div>
                <div className={styles.currentWeather__wrapper}>
                    <div className={styles.currentWeather__data}>
                        <div className={styles.currentWeather__data_name}>Влажность</div>
                        <div className={styles.currentWeather__data_name}>Точка росы</div>
                        <div className={styles.currentWeather__data_name}>Давление</div>
                        <div className={styles.currentWeather__data_name}>УФ-индекс</div>
                        <div className={styles.currentWeather__data_name}>Вероятность осадков</div>
                        <div className={styles.currentWeather__data_name}>Видимость</div>
                    </div>
                    <div className={styles.currentWeather__values}>
                        <div className={styles.currentWeather__data_value}>{currentMoi} %</div>
                        <div className={styles.currentWeather__data_value}>{dewpoint} °C</div>
                        <div className={styles.currentWeather__data_value}>{pressure} мбар</div>
                        <div className={styles.currentWeather__data_value}>{uvIndex}</div>
                        <div className={styles.currentWeather__data_value}>{precipProb} %</div>
                        <div className={styles.currentWeather__data_value}>{visibility} M</div>
                    </div>
                </div>
            </Container>
        </div>
    )
}, compareFunction)

export default TodayWeather
