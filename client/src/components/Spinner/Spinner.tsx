import classNames from 'classnames';
import styles from './Spinner.module.scss'
import { ReactComponent as Sun } from './sun.svg'

interface SpinnerProps {
    smallSize?: boolean
    visible?: boolean
}

const Spinner = ({smallSize, visible}: SpinnerProps) => {
    console.log(visible)
    return (
        <>
            {smallSize 
            ? <Sun className={styles.smallSun} /> 
            : <div className={styles.background}>
                 <Sun className={classNames(`${styles.sun}`, {[styles.smallSun]: smallSize })}  style={{opacity: visible ? "1" : "0"}}/>
              </div>}
        </>
        
    )
}

export default Spinner