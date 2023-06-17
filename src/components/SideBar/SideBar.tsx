import { X } from "@phosphor-icons/react"
import styles from "./SideBar.module.scss"
import { useContext } from "react"
import { Context } from "components/Header/Header"
import { NavLink } from "react-router-dom"

const SideBar = () => {

    const {barState, stateChange} = useContext(Context)
    console.log(barState, stateChange)


    return (
        <div className={styles.sideBar} style={barState ? {display: "flex"} : {display: "none"}}>
            <nav className={styles.nav}>
            <X className={styles.close} weight="bold" onClick={() => stateChange()}/>
                <NavLink to={`/`} className={({isActive}) => isActive ? `${styles.link} ${styles.active_link}` : styles.link}>Сегодня</NavLink>
                <NavLink to={`/tomorrow`} className={({isActive}) => isActive ? `${styles.link} ${styles.active_link}` : styles.link}>Завтра</NavLink>

                <div className={styles.link}>10 дней</div>
            </nav>
        </div>
    )
}

export default SideBar