import { useEffect, useState, useContext } from 'react'
import { List } from '@phosphor-icons/react'
import Container from 'shared/ui/Container/Container'
import { useAppSelector } from 'app/redux/hooks'
import { currentCity } from 'app/redux/selectors'
import StarSvg from './StarSvg'
import { BarContext } from 'widgets/SideBar/BarContext'

import styles from './Header.module.scss'

interface HeaderProps {
    children: JSX.Element
    background?: boolean
}

const Header = ({ children, background }: HeaderProps) => {
    const [scroll, setScroll] = useState({})
    const { stateChange } = useContext(BarContext)

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
        <>
            <header className={`${styles.header} ${scroll} ${background && styles.scroll}`}>
                <Container>
                    <div className={styles.header__inner}>
                        <div className={styles.city_wrapper}>
                            <div className={styles.location__city} data-type="city">
                                {city}
                            </div>
                            <StarSvg />
                        </div>
                        <List className={styles.burger} onClick={stateChange} />
                    </div>
                </Container>
            </header>
            {children}
        </>
    )
}

export default Header
