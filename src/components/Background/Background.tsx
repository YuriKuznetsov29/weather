import styles from './Backgroud.module.scss'

const Backgroud = () => {

    const changeImage = {
        background: `url("background${Math.floor(Math.random() * 5)}.jpg") 50% no-repeat`,
        backgroundSize: `cover`
    }

    return (
        <>
            <div className={styles.background}></div>
            <div className = {styles.backgroundImageWrapper}>
                <div className={styles.backgroundImage} style={changeImage}> </div>
            </div>
        </>
    )
}

export default Backgroud