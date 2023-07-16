import { ArrowDown, ArrowUp } from '@phosphor-icons/react'
import styles from './DayNigthTemp.module.scss'

interface DayNigthTempProps {
    dayTemp: number
    nigthTemp: number
}

const DayNigthTemp = ({dayTemp, nigthTemp}: DayNigthTempProps) => (
    <div className={styles.temperature}>
        <div className={styles.data}>
            Днем {dayTemp}° <ArrowUp className={styles.arrow} />
        </div>
        <div className={styles.data}>
            Ночью {nigthTemp}° <ArrowDown className={styles.arrow} />
        </div>
    </div>
)

export default DayNigthTemp