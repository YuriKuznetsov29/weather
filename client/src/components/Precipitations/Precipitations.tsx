import { useAppSelector } from "app/hooks"
import { currentWetherSelector, selectDay } from "app/selectors"

import styles from "./Precipitations.module.scss"
import Container from "components/Container/Container"
import DropSvg from "./DropSvg"

interface PrecipitationsPercent {
    [key: string]: number
}

const Precipitations = () => {
    const weather = useAppSelector(currentWetherSelector)
    const selectedDay = useAppSelector(selectDay)

    function calckPrecipitationInHour(quantity: number) {
        const precipPercent: PrecipitationsPercent = {
            "0.1": 0,
            "0.9": 20,
            "1": 30,
            "2": 55,
            "3": 65,
            "4": 80,
            "5": 90,
            "6": 100,
        }
        quantity =
            quantity > 1 ? (quantity >= 6 ? 6 : Math.round(quantity)) : quantity > 0.1 ? 0.9 : 0.1
        return precipPercent[quantity]
    }

    const renderPrecipitations = () => {
        if (weather) {
            const { dailyPrecipitation, dailyPrecipitationProb, dailyTime } =
                selectedDay === "today" ? weather.currentWeather : weather.tomorrowWeather

            const itemsArr = dailyPrecipitation.map((pecipitation, i) => {
                const percent = calckPrecipitationInHour(pecipitation)

                return (
                    <div key={i} className={styles.precipitation__item}>
                        <div className={styles.precipitation__probability}>
                            {dailyPrecipitationProb[i]}%
                        </div>
                        <DropSvg pecipitation={pecipitation} i={i} />
                        <div className={styles.precipitation__quantity_value}>{pecipitation}</div>
                        <div className={styles.precipitation__time}>{dailyTime[i]}</div>
                    </div>
                )
            })

            return (
                <div className={`${styles.precipitation}`}id="precipitation">
                    <Container>
                        <>
                            <div className={styles.precipitationTitle}>Осадки</div>
                            <div className={styles.precipitation__wrapper}>
                                <div className={styles.precipitation__titleWrapper}>
                                    <div className={styles.precipitation__probability_title}>
                                        Вероятность
                                    </div>
                                    <div className={styles.precipitation__quantity_title}>
                                        Количество
                                        <br />
                                        (мм)
                                    </div>
                                </div>
                                {itemsArr}
                            </div>
                        </>
                    </Container>
                </div>
            )
        } else {
            return (
                <div className={`${styles.precipitation}`} id="precipitation">
                    <Container>
                        <div className={styles.loading}>
                            <div className={styles.gradient}></div>
                        </div>
                    </Container>
                </div>
            )
        }
    }

    const content = renderPrecipitations()

    return <>{content}</>
}

export default Precipitations
