import { ArrowDown, ArrowUp } from '@phosphor-icons/react'
import styles from './DayNigthTemp.module.scss'

interface DayNigthTempProps {
    dayTemp: number
    nigthTemp: number
}

const DayNigthTemp = ({dayTemp, nigthTemp}: DayNigthTempProps) => (
    <div className={styles.temperature}>
        Днем {dayTemp}° <ArrowUp />
        Ночью {nigthTemp}° <ArrowDown  />
    </div>
)

export default DayNigthTemp