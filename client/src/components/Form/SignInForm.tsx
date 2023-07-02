import Button from "components/Button/Button"
import { SignIn, X } from "@phosphor-icons/react"
import styles from "./Form.module.scss"
import Input from "components/Input/Input"
import { useAppDispatch } from "app/hooks"
import { setSignInState, signIn } from "app/slices/loginSlice"
import { useState, ChangeEvent } from "react"

const SignUpForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useAppDispatch()

  return (
    <div className={styles.background_form}>
      <X className={styles.close} weight="bold" onClick={() => dispatch(setSignInState())} />

      <form className={styles.form} onSubmit={(e) => {
        e.preventDefault()
        dispatch(signIn({email, password}))
      }}>
        <div className={styles.title}>Вход</div>
        <Input
          label="Email"
          placeholder="введите email"
          type="email"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        ></Input>
        <Input
          label="Пароль"
          placeholder="введите пароль"
          type="password"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        ></Input>
        <Button type="submit">Войти</Button>
      </form>
    </div>
  )
}

export default SignUpForm
