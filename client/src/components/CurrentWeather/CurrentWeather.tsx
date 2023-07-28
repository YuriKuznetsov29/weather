import Container from "components/Container/Container"
import { useAppSelector } from "app/hooks"
import { currentWetherSelector, selectDay } from "app/selectors"
import TodayWeather from "./TodayWeather"
import TomorrowWether from "./TomorrowWether"
import { getTimeWithUtcOffset } from "helpers/transformData"

import styles from "./CurrentWeather.module.scss"

const CurrentWeather = () => {
    const weather = useAppSelector(currentWetherSelector)
    const selectedDay = useAppSelector(selectDay)

    const renderWether = () => {
        if (weather) {
            const { utcOffset } = weather.currentWeather
            const date = getTimeWithUtcOffset(utcOffset)

            if (selectedDay === "today") {
                return <TodayWeather weather={weather.currentWeather} date={date} />
            } else if (selectedDay === "tomorrow") {
                return <TomorrowWether weather={weather.tomorrowWeather} />
            }
        } else {
            return (
                <>
                    <Container>
                        <div className={styles.loading} id="load">
                            <div className={styles.gradient}></div>
                        </div>
                    </Container>
                    <br />
                    <br />
                    <br />
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

    return <>{content}</>
}

export default CurrentWeather
