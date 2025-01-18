import { useAppSelector } from 'app/redux/hooks'
import { currentWetherSelector, selectDay } from 'app/redux/selectors'
import { getTimeWithUtcOffset, getWindDirectionLong } from 'helpers/transformData'
import { ReactComponent as Arrow } from '../../assets/arrow-down-bold.svg'

import styles from './Charts.module.scss'

const CurrentWind = () => {
    const weather = useAppSelector(currentWetherSelector)
    const selectedDay = useAppSelector(selectDay)

    const renderCurrentWind = () => {
        if (weather && selectedDay === 'today') {
            const { dailyWind, dailyWindDir, utcOffset } = weather.currentWeather

            const { hour } = getTimeWithUtcOffset(utcOffset)
            const directionName = getWindDirectionLong(dailyWindDir[hour])
            return (
                <div className={styles.currentWind}>
                    <div className={styles.windValueWrapper}>
                        <div className={styles.windValue}>{dailyWind[hour]}</div>
                        км/ч
                    </div>
                    <div className={styles.windDir}>
                        <Arrow
                            className={styles.arrow}
                            width="50px"
                            height="50px"
                            style={{ transform: `rotate(${dailyWindDir[hour]}deg)` }}
                        />
                        <div className={styles.windDirNote}>Сейчас • {directionName}</div>
                    </div>
                </div>
            )
        }
    }

    const content = renderCurrentWind()

    return <>{content}</>
}

export default CurrentWind
