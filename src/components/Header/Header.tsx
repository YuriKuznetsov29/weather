import { useContext, useEffect, useState, createContext } from 'react';
import { List } from '@phosphor-icons/react';
import Container from 'components/Container/Container';
import { useAppSelector } from 'app/hooks';
import { currentCity } from 'app/selectors';

import styles from './Header.module.scss';

type BarContext = {
    barState: boolean
    stateChange: () => void
}

export const Context = createContext<BarContext>(null!)

interface HeaderProps {
    children: JSX.Element
}

const Header = ({children}: HeaderProps) => {
    const [scroll, setScroll] = useState({})
    const [barState, setBarState] = useState(false)

    const stateChange = () => {
        setBarState(!barState)
    }

    const city = useAppSelector(currentCity)

    useEffect(() => {
        document.body.onscroll = () => {
            if (window.pageYOffset > 0) {
                setScroll(styles.scroll)
            } else {
                setScroll({})
            }
        }

        return () => {
            document.body.onscroll = null
        }
    })

    return (
        <Context.Provider value={{barState, stateChange}}>
        <header className={`${styles.header} ${scroll}`}>
            <Container>
                <div className={styles.header__inner}>
                    <div className={styles.location__city} data-type="city">{city}</div>
                    <List size={24} color="#fff" onClick={() => stateChange()} />
                </div>
            </Container>
        </header>
        {children}
        </Context.Provider>
    )
}

export default Header