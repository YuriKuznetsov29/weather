import Container from "components/Container/Container"
import { weatherDescription, getTimeWithUtcOffset, getWetherImage } from "services/tranformData"
import { useAppSelector } from "app/hooks"
import { currentWether } from "app/selectors"
import styles from './TenDaysWeather.module.scss'

const TenDaysWeather = () => {
    const weather = useAppSelector(currentWether)

    

    const renderContent = () => {
        if (weather) {
            const {sunrise, sunset, weathercode, utcOffset, dailyMoi, tempMax, tempMin} = weather?.tenDaysWeather

            const days = ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"]
            const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
            
            let startOffset = utcOffset
            const content = []

            for (let i = 0; i < 10; i++) {
                const {day, month, week} = getTimeWithUtcOffset(startOffset)
                startOffset += 84600
                const image = getWetherImage(sunrise[i], sunset[i], weathercode[i], utcOffset)
                content.push(
                    <Container key={i}>
                        <div className={styles.days_wrapper}>
                            <div>
                                <div className={styles.time}>{days[week]} {day} {months[month]}</div>
                                <div>{weatherDescription[weathercode[i]]}</div>
                            </div>
                            <div className={styles.data_wrapper}>
                                <i className={`wi ${image} ${styles.icon}`}></i>
                                <div>
                                    <div className={styles.high_temp}>{tempMax[i]}</div>
                                    <div className={styles.low_temp}>{tempMin[i]}</div>
                                </div>
                            </div>
                        </div>
                    </Container>
                )
            }
            return content
        }
    }

    const content = renderContent()

    return (
        <>
            {content}
        </>
        
    )
}

export default TenDaysWeather