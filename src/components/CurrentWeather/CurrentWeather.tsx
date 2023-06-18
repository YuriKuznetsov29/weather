import Container from 'components/Container/Container'
import { getWetherImage, weatherDescription, getTimeWithUtcOffset } from 'services/tranformData'
import { useAppSelector } from 'app/hooks'
import { currentWether, selectDay } from 'app/selectors'

import styles from './CurrentWeather.module.scss'
import TodayWeather from './TodayWeather'
import TomorrowWether from './TomorrowWether'

const CurrentWeather = () => {

    const weather = useAppSelector(currentWether)
    const selectedDay = useAppSelector(selectDay)
    
    const renderWether = () => {

        if (weather) {
            if (selectedDay === "today") {
                return <TodayWeather weather={weather.currentWeather}/>
            } else if (selectedDay === "tomorrow") {
                return <TomorrowWether weather={weather.tomorrowWeather}/>
            }
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