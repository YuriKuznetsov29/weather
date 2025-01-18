import { useAppSelector } from 'app/redux/hooks'
import { currentWetherSelector } from 'app/redux/selectors'
import { getTimeWithUtcOffset } from 'helpers/transformData'
import { calkDayDuration, checkTimesOfDay } from '../../helpers/chartHelpers'

import styles from './Charts.module.scss'

const DayParameters = () => {
    const weather = useAppSelector(currentWetherSelector)

    const renderDayParameters = () => {
        if (weather) {
            const { utcOffset, sunrise, sunset } = weather.currentWeather

            const { hour, minutes, time } = getTimeWithUtcOffset(utcOffset)
            const timesOfDay = checkTimesOfDay(sunrise, sunset, time)

            const { hours, min, beforeSunsetHour, beforeSunsetMin } = calkDayDuration(
                sunrise,
                sunset,
                hour,
                minutes
            )
            return (
                <div className={styles.additionalData}>
                    <div className={styles.additionalData_value}>
                        Продолжительность дня {hours} ч {min} мин
                    </div>
                    {timesOfDay && (
                        <div className={styles.additionalData_value}>
                            Время до захода {beforeSunsetHour !== 0 && `${beforeSunsetHour} ч`}{' '}
                            {beforeSunsetMin} мин
                        </div>
                    )}
                </div>
            )
        }
    }

    const content = renderDayParameters()

    return <>{content}</>
}

export default DayParameters
