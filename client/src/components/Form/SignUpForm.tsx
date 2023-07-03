import Button from "components/Button/Button"
import { X } from "@phosphor-icons/react"
import Input from "components/Input/Input"
import { setSignUpState, signUp } from "app/slices/loginSlice"
import { useAppDispatch } from "app/hooks"
import { useState, ChangeEvent } from "react"
import { Formik, Field, Form, ErrorMessage, useFormikContext } from "formik"
import * as Yup from "yup"

import styles from "./Form.module.scss"

interface Values {
  email: string
  password: string
  confirmPassword: string
}

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Неправильный формат email").required("Введите Email"),
  password: Yup.string()
    .min(8, "Пароль не должен быть короче 8 символов")
    .required("Введите пароль"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Пароли не совпадают")
    .min(8, "Пароль не должен быть короче 8 символов")
    .required("Введите пароль"),
})

const SignUpForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")

  const dispatch = useAppDispatch()

  const data = useFormikContext()

  console.log(data)

  return (
    <div className={styles.background_form}>
      <X className={styles.close} weight="bold" onClick={(e) => dispatch(setSignUpState())} />

      <Formik
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values: Values) => {
          const { email, password } = values
          dispatch(signUp({ email, password }))
        }}
      >
        <Form className={styles.form}>
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <Field className={styles.input} id="email" name="email" placeholder="введите email" />
          <ErrorMessage component="div" name="email" />

          <label className={styles.label} htmlFor="password">
            Пароль
          </label>
          <Field
            className={styles.input}
            id="password"
            name="password"
            type="password"
            placeholder="введите пароль"
          />
          <ErrorMessage component="div" name="password" />

          <label className={styles.label} htmlFor="password">
            Пароль
          </label>
          <Field
            className={styles.input}
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="повторите пароль"
          />
          <ErrorMessage component="div" name="confirmPassword" />

          <Button type="submit">Войти</Button>
        </Form>
      </Formik>

      {/* <form
                className={styles.form}
                onSubmit={(e) => {
                    e.preventDefault()
                    dispatch(signUp({email, password}))
                }}
            >
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
                <Button type="submit">Зарегистрироваться</Button>
            </form> */}
    </div>
  )
}

export default SignUpForm
