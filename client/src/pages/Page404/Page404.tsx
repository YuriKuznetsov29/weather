import { useNavigate } from 'react-router-dom'
import styles from './Page404.module.scss'

const Page404 = () => {
    const navigate = useNavigate()

    return (
        <div className={styles.background}>
            <img className={styles.sun} src="sun.svg" alt="sun" onClick={() => navigate('/')} />
            <h1>Страница не найдена</h1>
        </div>
    )
}

export default Page404
