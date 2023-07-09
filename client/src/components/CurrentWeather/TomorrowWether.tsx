import Container from 'components/Container/Container'
import styles from './CurrentWeather.module.scss'
import { getTimeWithUtcOffset, weatherDescription } from 'services/tranformData'
import {TomorrowWeather, getWetherImage} from '../../services/tranformData'
import DayNigthTemp from 'components/DayNigthTemp/DayNigthTemp'

interface TomorrowProps {
    weather: TomorrowWeather
}

const TomorrowWether = ({weather}: TomorrowProps) => {

    const {sunrise, sunset, weathercode, utcOffset, dailyMoi, uvIndex, tempMax, tempMin} = weather

    const days = ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"]
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
    const  {tomorrowDay, tomorrowMonth, weekDay} = getTimeWithUtcOffset(utcOffset)
    const image = getWetherImage(sunrise, sunset, weathercode, utcOffset)

    return(
        <div className={styles.currentWeather} id="currentWeather">
            <Container>
                <div className={styles.currentWeather__wrapper}>
                    <div className={styles.currentWeather__data}>
                        <div className={styles.currentWeather__data_time}>{days[weekDay]}, {tomorrowDay} {months[tomorrowMonth]}</div>
                        <DayNigthTemp dayTemp={tempMax} nigthTemp={tempMin}/>
                        <div className={styles.currentWeather__codeValue}>{weatherDescription[weathercode]}</div>
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
                            <div className={styles.currentWeather__data_value}>{sunrise}, {sunset}</div>
                        </div>
                    </div>
                </>
            </Container>
        </div>
    )
}

export default TomorrowWether