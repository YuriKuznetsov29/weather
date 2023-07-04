import Button from "components/Button/Button"
import { X } from "@phosphor-icons/react"
import Input from "components/Input/Input"
import { useAppDispatch, useAppSelector } from "app/hooks"
import { setSignInState, signIn } from "app/slices/loginSlice"
import { useState, ChangeEvent, useEffect } from "react"
import { Formik, Field, Form, ErrorMessage } from "formik"
import * as Yup from "yup"

import styles from "./Form.module.scss"
import { serverErrorsSelector, statusSelector } from "app/selectors"

interface Values {
  email: string
  password: string
}

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Неправильный формат email").required("Введите Email"),
  password: Yup.string()
    .min(8, "Пароль не должен быть короче 8 символов")
    .required("Введите пароль"),
})

const SignUpForm = () => {
  const dispatch = useAppDispatch()
  const loadStatus = useAppSelector(statusSelector)
  const serverError = useAppSelector(serverErrorsSelector)

  useEffect(() => {
    if (loadStatus === "finished") {
      dispatch(setSignInState())
    }
  }, [loadStatus])

  return (
    <div className={styles.background_form}>
      <X className={styles.close} weight="bold" onClick={() => dispatch(setSignInState())} />

      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values: Values) => {
          const { email, password } = values
          dispatch(signIn({ email, password }))
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

          {serverError && <div>{serverError}</div>}
          {loadStatus === "loading" && <div>Loading...</div>}
          <Button type="submit">Войти</Button>
        </Form>
      </Formik>
    </div>
  )
}

export default SignUpForm
