import { useAppSelector } from "app/hooks";
import { currentWetherSelector } from "app/selectors";
import { getTimeWithUtcOffset } from "helpers/tranformData";
import { calkDayDuration } from "./chartHelpers";

import  styles from "./Charts.module.scss";


const DayParameters = () => {

    const weather = useAppSelector(currentWetherSelector)

    const renderDayParameters = () => {
        if (weather) {
            const {
                utcOffset, 
                sunrise, 
                sunset, 
            } = weather.currentWeather
            
            const {hour, minutes} = getTimeWithUtcOffset(utcOffset)
            const [hours, min, beforeSunsetHour, beforeSunsetMin] = calkDayDuration(sunrise, sunset, hour, minutes)
            return (
                <div className={styles.additionalData}>
                    <div className={styles.additionalData_value}>Продолжительность дня {hours} ч {min} мин</div>
                    <div className={styles.additionalData_value}>Время до захода {beforeSunsetHour} ч {beforeSunsetMin} мин</div>
                </div>
            )
        }
    }

    const content = renderDayParameters()

    return (
        <>
            {content}
        </>
    )
}

export default DayParameters;