import { X } from "@phosphor-icons/react"
import styles from "./SideBar.module.scss"
import { useContext } from "react"
import { Context } from "components/Header/Header"

const SideBar = () => {

    const {barState, stateChange} = useContext(Context)
    console.log(barState, stateChange)


    return (
        <div className={styles.sideBar} style={barState ? {display: "flex"} : {display: "none"}}>
            <nav className={styles.nav}>
            <X className={styles.close} weight="bold" onClick={() => stateChange()}/>
                <div className={styles.link}>Сегодня</div>
                <div className={styles.link}>Завтра</div>
                <div className={styles.link}>10 дней</div>
            </nav>
        </div>
    )
}

export default SideBar