import Button from "components/Button/Button"
import { X, Eye, EyeSlash } from "@phosphor-icons/react"
import { setSignUpState, signUp } from "app/slices/loginSlice"
import { useAppDispatch, useAppSelector } from "app/hooks"
import { useState, ChangeEvent, useEffect } from "react"
import { Formik, Field, Form, ErrorMessage, useFormikContext } from "formik"
import * as Yup from "yup"

import styles from "./Form.module.scss"
import { serverErrorsSelector, statusSelector } from "app/selectors"

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
  const [showPassword, setShowPassword] = useState("password")

  const dispatch = useAppDispatch()
  const loadStatus = useAppSelector(statusSelector)
  const serverError = useAppSelector(serverErrorsSelector)

  const toggleShowPassword = () => {
    if (showPassword === "password") {
      setShowPassword("text")
    } else {
      setShowPassword("password")
    }
  }

  useEffect(() => {
    if (loadStatus === "finished") {
      dispatch(setSignUpState())
    }
  }, [loadStatus])

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
          <div className={styles.inputWrapper}>
            <Field className={styles.input} id="email" name="email" placeholder="введите email" />
            <ErrorMessage className={styles.fieldError} component="div" name="email" />
          </div>

          <label className={styles.label} htmlFor="password">
            Пароль
          </label>
          <div className={styles.inputWrapper}>
            <Field
              className={styles.input}
              id="password"
              name="password"
              type={showPassword}
              placeholder="введите пароль"
            />
            <div className={styles.passwordEye} onClick={toggleShowPassword}>
              {showPassword === "password" ? (
                <EyeSlash size={22} color="#000" />
              ) : (
                <Eye size={22} color="#000" />
              )}
            </div>
            <ErrorMessage className={styles.fieldError} component="div" name="password" />
          </div>

          <label className={styles.label} htmlFor="password">
            Повторите пароль
          </label>
          <div className={styles.inputWrapper}>
            <Field
              className={styles.input}
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword}
              placeholder="повторите пароль"
            />
            <div className={styles.passwordEye} onClick={toggleShowPassword}>
              {showPassword === "password" ? (
                <EyeSlash size={22} color="#000" />
              ) : (
                <Eye size={22} color="#000" />
              )}
            </div>
            <ErrorMessage className={styles.fieldError} component="div" name="confirmPassword" />
          </div>

          {serverError && <div>{serverError}</div>}
          {loadStatus === "loading" && <div>Loading...</div>}
          <Button type="submit">Войти</Button>
        </Form>
      </Formik>
    </div>
  )
}

export default SignUpForm
