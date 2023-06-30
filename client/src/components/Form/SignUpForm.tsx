import Button from "components/Button/Button"
import { X } from "@phosphor-icons/react"
import styles from "./Form.module.scss"
import Input from "components/Input/Input"
import { setSignUpState } from "app/slices/loginSlice"
import { useAppDispatch } from "app/hooks"
import { useState, ChangeEvent } from "react"

const SignUpForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")

  const dispatch = useAppDispatch()

  return (
    <div className={styles.background_form}>
      <X className={styles.close} weight="bold" onClick={() => dispatch(setSignUpState())} />

      <form className={styles.form}>
        <div className={styles.title}>Регистрация</div>
        <Input
          label="Email"
          value={email}
          placeholder="введите логин"
          type="email"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        ></Input>
        <Input
          label="Пароль"
          value={password}
          placeholder="введите пароль"
          type="password"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        ></Input>
        <Input
          label="Пароль"
          value={repeatPassword}
          placeholder="повторите пароль"
          type="password"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setRepeatPassword(e.target.value)}
        ></Input>
        <Button>Зарегистрироваться</Button>
      </form>
    </div>
  )
}

export default SignUpForm
