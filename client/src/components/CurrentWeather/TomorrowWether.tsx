import Container from "components/Container/Container"
import { getTimeWithUtcOffset } from "helpers/transformData"
import { days, months, weatherDescription } from "helpers/constants"
import { TomorrowWeather, getWetherImage } from "helpers/transformData"
import DayNightTemp from "components/DayNightTemp/DayNightTemp"

import styles from "./CurrentWeather.module.scss"

interface TomorrowProps {
    weather: TomorrowWeather
}

const TomorrowWether = ({ weather }: TomorrowProps) => {
    const { sunrise, sunset, weathercode, utcOffset, dailyMoi, uvIndex, tempMax, tempMin } = weather
    const { tomorrowDay, tomorrowMonth, weekDay } = getTimeWithUtcOffset(utcOffset)
    const image = getWetherImage(sunrise, sunset, weathercode, utcOffset)

    return (
        <div className={styles.currentWeather} id="currentWeather">
            <Container>
                <div className={styles.currentWeather__wrapper}>
                    <div className={styles.currentWeather__data}>
                        <div className={styles.currentWeather__data_time}>
                            {days[weekDay]}, {tomorrowDay} {months[tomorrowMonth]}
                        </div>
                        <DayNightTemp dayTemp={tempMax} nightTemp={tempMin} />
                        <div className={styles.currentWeather__codeValue}>
                            {weatherDescription[weathercode]}
                        </div>
                    </div>
                    <div className={styles.currentWeather__code}>
                        <i className={`wi ${image} ${styles.code_icon}`}></i>
                    </div>
                </div>
            </Container>
            <Container>
                <>
                    <div className={styles.currentWeather__nowTitle}>Подробности</div>
                    <div className={styles.currentWeather__wrapper}>
                        <div className={styles.currentWeather__data}>
                            <div className={styles.currentWeather__data_name}>Влажность</div>
                            <div className={styles.currentWeather__data_name}>УФ-индекс</div>
                            <div className={styles.currentWeather__data_name}>Восход/Заход</div>
                        </div>
                        <div className={styles.currentWeather__values}>
                            <div className={styles.currentWeather__data_value}>{dailyMoi} %</div>
                            <div className={styles.currentWeather__data_value}>{uvIndex}</div>
                            <div className={styles.currentWeather__data_value}>
                                {sunrise}, {sunset}
                            </div>
                        </div>
                    </div>
                </>
            </Container>
        </div>
    )
}

export default TomorrowWether
