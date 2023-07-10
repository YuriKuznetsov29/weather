import { X } from "@phosphor-icons/react"
import styles from "./SideBar.module.scss"
import { useContext, useEffect } from "react"
import { Context } from "components/Header/Header"
import { NavLink, useMatch, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "app/hooks"
import { setDay } from "app/slices/weatherSlice"
import Button from "components/Button/Button"
import { setSignUpState, setSignInState, signOut } from "app/slices/loginSlice"
import { authStatusSelector, userSelector } from "app/selectors"

const SideBar = () => {
  const { barState, stateChange } = useContext(Context)
  const dispatch = useAppDispatch()

  const authStatus = useAppSelector(authStatusSelector)
  const user = useAppSelector(userSelector)

  const navigate = useNavigate()
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
    <div className={styles.sideBar} style={barState ? { display: "flex" } : { display: "none" }}>
      <nav className={styles.nav}>
        <X className={styles.close} weight="bold" onClick={() => stateChange()} />
        {authStatus ? (
          <div className={styles.email}>{user.email}</div>
        ) : (
          <div className={styles.email}>Пожалуйста авторизуйтесь или зарегистрируйтесь</div>
        )}
        <div className={styles.buttonWrapper}>
          {authStatus ? (
            <Button
              addStyles={{ width: "150px" }}
              onClick={() => {
                dispatch(signOut())
                navigate("/", {replace: true})
                stateChange()
              }}
            >
              Выйти
            </Button>
          ) : (
            <>
            <NavLink to={"/signUp"}>
              <Button
                addStyles={{ width: "150px" }}
                onClick={() => {
                  stateChange()
                }}
              >
                Регистрация
              </Button>
            </NavLink>
            <NavLink to={"/signIn"}>
              <Button
                addStyles={{ width: "150px" }}
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
