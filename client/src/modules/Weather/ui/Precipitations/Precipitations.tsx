import { useAppSelector } from 'app/providers/StoreProvider/config/hooks'
import { currentWetherSelector, selectDay } from '../../store/selectors'
import Container from 'shared/ui/Container/Container'
import DropSvg from './DropSvg'

import styles from './Precipitations.module.scss'

const Precipitations = () => {
    const weather = useAppSelector(currentWetherSelector)
    const selectedDay = useAppSelector(selectDay)

    const renderPrecipitations = () => {
        if (weather) {
            const { dailyPrecipitation, dailyPrecipitationSum, dailyPrecipitationProb, dailyTime } =
                selectedDay === 'today' ? weather.currentWeather : weather.tomorrowWeather

            const itemsArr = dailyPrecipitation.map((pecipitation, i) => {
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
                <div className={`${styles.precipitation}`} id="precipitation">
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
                            <div className={styles.general}>
                                Общий суточный объем{' '}
                                <div className={styles.generalValue}>{dailyPrecipitationSum}мм</div>
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
