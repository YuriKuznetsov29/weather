import { ArrowDown, ArrowUp } from '@phosphor-icons/react'
import styles from './DayNightTemp.module.scss'

interface DayNightTempProps {
    dayTemp: number
    nightTemp: number
}

const DayNightTemp = ({dayTemp, nightTemp}: DayNightTempProps) => (
    <div className={styles.temperature}>
        <div className={styles.data}>
            Днем {dayTemp}° <ArrowUp className={styles.arrow} />
        </div>
        <div className={styles.data}>
            Ночью {nightTemp}° <ArrowDown className={styles.arrow} />
        </div>
    </div>
)

export default DayNightTemp