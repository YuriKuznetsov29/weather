import styles from "./DayNightTemp.module.scss"

interface DayNightTempProps {
    dayTemp: number
    nightTemp: number
}

const DayNightTemp = ({ dayTemp, nightTemp }: DayNightTempProps) => (
    <div className={styles.temperature}>
        <div className={styles.data}>
            Днем {dayTemp}° <i className={`wi wi-direction-up ${styles.arrow}`}></i>
        </div>
        <div className={styles.separator}>•</div>
        <div className={styles.data}>
            Ночью {nightTemp}° <i className={`wi wi-direction-down ${styles.arrow}`}></i>
        </div>
    </div>
)

export default DayNightTemp
