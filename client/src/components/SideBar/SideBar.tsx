import { X } from '@phosphor-icons/react'
import { useContext, useEffect } from 'react'
import { NavLink, useMatch, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'app/providers/StoreProvider/config/hooks'
import Button from 'shared/ui/Button/Button'
import classNames from 'classnames'
import styles from './SideBar.module.scss'
import { authStatusSelector, userSelector } from 'modules/Authorization/store/selectors'
import { setDay } from 'modules/Weather/store/weatherSlice'
import { signOut } from 'modules/Authorization/api/signOut'
import { SideBarContext } from 'app/providers/SideBarProvider/lib/SideBarContext'

const SideBar = () => {
    const { barState, stateChange } = useContext(SideBarContext)

    const dispatch = useAppDispatch()

    const authStatus = useAppSelector(authStatusSelector)
    const user = useAppSelector(userSelector)

    const navigate = useNavigate()
    const main = useMatch(`/`)
    const tomorrow = useMatch(`/tomorrow`)

    useEffect(() => {
        if (barState) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
    }, [barState])

    const checkUrl = () => {
        if (main) {
            dispatch(setDay('today'))
        } else if (tomorrow) {
            dispatch(setDay('tomorrow'))
        }
    }

    useEffect(() => {
        checkUrl()
    }, [])

    return (
        <div
            className={classNames(`${styles.sidebar}`, { [styles.active_bar]: barState })}
            id="close"
            onClick={(e) => {
                if ((e.target as HTMLElement).id === 'close') stateChange()
            }}
        >
            <nav className={styles.nav}>
                <X className={styles.close} weight="bold" onClick={stateChange} />
                {authStatus ? (
                    <div className={styles.email}>{user.email}</div>
                ) : (
                    <div className={styles.email}>
                        Пожалуйста авторизуйтесь или зарегистрируйтесь
                    </div>
                )}
                <div className={styles.buttonWrapper}>
                    {authStatus ? (
                        <Button
                            addStyles={{ width: '150px' }}
                            onClick={() => {
                                dispatch(signOut())
                                navigate('/', { replace: true })
                                stateChange()
                            }}
                        >
                            Выйти
                        </Button>
                    ) : (
                        <>
                            <NavLink to={'/signUp'}>
                                <Button
                                    addStyles={{ width: '150px' }}
                                    onClick={() => {
                                        stateChange()
                                    }}
                                >
                                    Регистрация
                                </Button>
                            </NavLink>
                            <NavLink to={'/signIn'}>
                                <Button
                                    addStyles={{ width: '150px' }}
                                    onClick={() => {
                                        stateChange()
                                    }}
                                >
                                    Войти
                                </Button>
                            </NavLink>
                        </>
                    )}
                </div>
                <NavLink
                    to={`/`}
                    className={({ isActive }) =>
                        isActive ? `${styles.link} ${styles.active_link}` : styles.link
                    }
                    onClick={() => {
                        stateChange()
                    }}
                >
                    Сегодня
                </NavLink>
                <NavLink
                    to={`/tomorrow`}
                    className={({ isActive }) =>
                        isActive ? `${styles.link} ${styles.active_link}` : styles.link
                    }
                    onClick={() => {
                        stateChange()
                    }}
                >
                    Завтра
                </NavLink>

                <NavLink
                    to={`/tenDays`}
                    className={({ isActive }) =>
                        isActive ? `${styles.link} ${styles.active_link}` : styles.link
                    }
                    onClick={() => {
                        stateChange()
                    }}
                >
                    10 дней
                </NavLink>

                <NavLink
                    to={`/savedLocations`}
                    className={({ isActive }) =>
                        isActive ? `${styles.link} ${styles.active_link}` : styles.link
                    }
                    onClick={() => {
                        stateChange()
                    }}
                >
                    Сохраненные города
                </NavLink>
            </nav>
        </div>
    )
}

export default SideBar
