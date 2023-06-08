import Container from 'components/Container/Container';
import { useAppSelector } from 'app/hooks';
import { currentCity } from 'app/selectors';

import styles from './Header.module.scss';

const Header = () => {

    const city = useAppSelector(currentCity)

    return (
        <Container>
            <div className={styles.header__inner}>
                <div className={styles.location__city} data-type="city">{city}</div>
            </div>
        </Container>
    )
}

export default Header