import Container from 'components/Container/Container'
import { getWetherImage, weatherDescription, getTimeWithUtcOffset } from 'services/tranformData'
import { useAppSelector } from 'app/hooks'
import { currentWether } from 'app/selectors'

import styles from './CurrentWeather.module.scss'

const CurrentWeather = () => {

    const wether = useAppSelector(currentWether)
    
    const renderWether = () => {

        if (wether) {
            const {sunrise, sunset, weathercode, utcOffset, currentMoi, dewpoint, pressure, uvIndex, precipProb, visibility, currentTemp, realFeel} = wether

            const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
            const {time, month, day} = getTimeWithUtcOffset(utcOffset)
    
            const image = getWetherImage(sunrise, sunset, weathercode, utcOffset)
    
            return (
                <div className={styles.currentWeather} id="currentWeather">
                    <Container>
                        <div className={styles.currentWeather__wrapper}>
                            <div className={styles.currentWeather__data}>
                                <div className={styles.currentWeather__data_time}>{day} {months[month]}, {time}</div>
                                <div className={styles.currentWeather__data_temp}>{currentTemp}°C</div>
                                <div className={styles.currentWeather__data_Feeltemp}>Ощущается как {realFeel}°C</div>
                            </div>
                            <div className={styles.currentWeather__code}>
                                <i className={`wi ${image} ${styles.code_icon}`}></i>
                                <div className={styles.currentWeather__codeValue}>{weatherDescription[weathercode]}</div>
                            </div>
                        </div>
                    </Container>
                    <Container>
                        <>
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
                        </>
                    </Container>
                </div>
            )
        } else {
            return (
                <>
                    <Container>
                    <div className={styles.loading} id="load">
                        <div className={styles.gradient}></div>
                    </div>
                    </Container>
                    <br/>
                    <br/>
                    <br/>
                    <Container>
                        <div className={styles.loading} id="load">
                            <div className={styles.gradient}></div>
                        </div>
                    </Container>
                </>
            )
        }
    }

    const content = renderWether()

    return (
        <>
            {content}
        </>
    )
}

export default CurrentWeather