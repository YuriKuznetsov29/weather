import { X } from "@phosphor-icons/react"
import styles from "./SideBar.module.scss"
import { useContext } from "react"
import { Context } from "components/Header/Header"
import { NavLink } from "react-router-dom"
import { useAppDispatch } from "app/hooks"
import { setDay } from "app/slices/weatherSlice"

const SideBar = () => {

    const {barState, stateChange} = useContext(Context)

    const dispatch = useAppDispatch()

    return (
        <div className={styles.sideBar} style={barState ? {display: "flex"} : {display: "none"}}>
            <nav className={styles.nav}>
            <X className={styles.close} weight="bold" onClick={() => stateChange()}/>
                <NavLink 
                    to={`/`} 
                    className={({isActive}) => isActive ? `${styles.link} ${styles.active_link}` : styles.link}
                    onClick={() => dispatch(setDay("today"))}>
                        Сегодня
                    </NavLink>
                <NavLink 
                    to={`/tomorrow`} 
                    className={({isActive}) => isActive ? `${styles.link} ${styles.active_link}` : styles.link}
                    onClick={() => dispatch(setDay("tomorrow"))}>
                        Завтра
                    </NavLink>

                <div className={styles.link}>10 дней</div>
            </nav>
        </div>
    )
}

export default SideBar