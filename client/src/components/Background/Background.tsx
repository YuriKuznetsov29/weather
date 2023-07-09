import styles from './Backgroud.module.scss'

interface BackgroudProps {
    children: JSX.Element
}

const Backgroud = ({children}: BackgroudProps) => {

    const changeImage = {
        background: `url("background${Math.floor(Math.random() * 5)}.jpg") 50% no-repeat`,
        backgroundSize: `cover`
    }

    return (
        <div className={styles.backgroundWrapper}>
            <div className={styles.background}></div>
            <div className = {styles.backgroundImageWrapper}>
                <div className={styles.backgroundImage} style={changeImage}> </div>
            </div>
            {children}
        </div>
    )
}

export default Backgroud