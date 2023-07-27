import Button from "components/Button/Button"
import { Eye, EyeSlash } from "@phosphor-icons/react"
import { signUp } from "app/slices/loginSlice"
import { useAppDispatch, useAppSelector } from "app/hooks"
import { useState, useEffect } from "react"
import { Formik, Field, Form, ErrorMessage } from "formik"
import * as Yup from "yup"
import { authStatusSelector, serverErrorsSelector, statusSelector } from "app/selectors"
import { useLocation, useNavigate } from "react-router-dom"
import Spinner from "components/Spinner/Spinner"

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
  const [showPassword, setShowPassword] = useState("password")

  const dispatch = useAppDispatch()
  const auth = useAppSelector(authStatusSelector)
  const loadStatus = useAppSelector(statusSelector)
  const serverError = useAppSelector(serverErrorsSelector)
  
  const navigate = useNavigate()
  const location = useLocation()
  const fromPage = location.state?.from?.pathname || '/'

  const toggleShowPassword = () => {
    if (showPassword === "password") {
      setShowPassword("text")
    } else {
      setShowPassword("password")
    }
  }

  useEffect(() => {
    if (auth) {
        navigate(fromPage)
    }
  }, [auth])

  return (
    <div className={styles.background_form}>
      <img className={styles.sun} src="sun.svg" alt="sun" onClick={() => navigate('/')} />
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

          {serverError 
            ? <div>{serverError}</div>
            : <div style={{visibility: "hidden"}}>Error</div>
          }

          {loadStatus === "loading" 
            ? <Spinner smallSize={true}/>
            : <div style={{height: "34px"}}></div>
          }
          <Button type="submit" disabled={loadStatus === "loading" ? true : false}>Зарегистрироваться</Button>
        </Form>
      </Formik>
    </div>
  )
}

export default SignUpForm
