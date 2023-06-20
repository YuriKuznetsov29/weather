import { X } from "@phosphor-icons/react"
import styles from "./SideBar.module.scss"
import { useContext, useEffect } from "react"
import { Context } from "components/Header/Header"
import { NavLink, useMatch } from "react-router-dom"
import { useAppDispatch } from "app/hooks"
import { setDay } from "app/slices/weatherSlice"

const SideBar = () => {
    const {barState, stateChange} = useContext(Context)
    const dispatch = useAppDispatch()
    const main = useMatch(`/`)
    const tomorrow = useMatch(`/tomorrow`)

    const checkUrl = () => {
        if (main) {
            dispatch(setDay("today"))
        } else if (tomorrow) {
            dispatch(setDay("tomorrow"))
        }
    }

    useEffect(() => {
        checkUrl()
    }, [])

    return (
        <div className={styles.sideBar} style={barState ? {display: "flex"} : {display: "none"}}>
            <nav className={styles.nav}>
            <X className={styles.close} weight="bold" onClick={() => stateChange()}/>
                <NavLink 
                    to={`/`} 
                    className={({isActive}) => isActive ? `${styles.link} ${styles.active_link}` : styles.link}>
                        Сегодня
                    </NavLink>
                <NavLink 
                    to={`/tomorrow`} 
                    className={({isActive}) => isActive ? `${styles.link} ${styles.active_link}` : styles.link}>
                        Завтра
                    </NavLink>

                <NavLink 
                    to={`/tenDays`} 
                    className={({isActive}) => isActive ? `${styles.link} ${styles.active_link}` : styles.link}>
                        10 дней
                </NavLink>
            </nav>
        </div>
    )
}

export default SideBar