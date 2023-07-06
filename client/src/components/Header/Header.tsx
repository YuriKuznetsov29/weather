import { useContext, useEffect, useState, createContext } from 'react';
import { List, Star } from '@phosphor-icons/react';
import Container from 'components/Container/Container';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { currentCity, currentLocationSelector, userSelector } from 'app/selectors';

import { createSelector } from '@reduxjs/toolkit';

import styles from './Header.module.scss';
import { saveLocations } from 'app/slices/loginSlice';
import { CurrentLocation } from 'app/slices/locationSlice';

type BarContext = {
    barState: boolean
    stateChange: () => void
}

export const Context = createContext<BarContext>(null!)

interface HeaderProps {
    children: JSX.Element
    background?: boolean
}

const Header = ({children, background}: HeaderProps) => {
    const [scroll, setScroll] = useState({})
    const [barState, setBarState] = useState(false)

    const dispatch = useAppDispatch()
    const { userId, savedLocations } = useAppSelector(userSelector)
    const currentLocation = useAppSelector(currentLocationSelector)

    const stateChange = () => {
        setBarState(!barState)
    }

    const saveCurrentLocation = () => {
        if (currentLocation) {
            const newLocations: CurrentLocation[] = savedLocations.concat([currentLocation])
            dispatch(saveLocations({userId, savedLocations: newLocations}))
        }
        
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
        <header className={`${styles.header} ${scroll} ${background && styles.scroll}`}>
            <Container>
                <div className={styles.header__inner}>
                    <div>
                        <div className={styles.location__city} data-type="city">{city}</div>
                        <Star size={24} color="#deb25c" weight="bold" onClick={saveCurrentLocation} />
                    </div>

                    <List className={styles.burger} onClick={() => stateChange()} />
                </div>
            </Container>
        </header>
        {children}
        </Context.Provider>
    )
}

export default Header