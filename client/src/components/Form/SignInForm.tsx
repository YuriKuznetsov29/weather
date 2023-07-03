import Button from "components/Button/Button"
import { X } from "@phosphor-icons/react"
import Input from "components/Input/Input"
import { useAppDispatch } from "app/hooks"
import { setSignInState, signIn } from "app/slices/loginSlice"
import { useState, ChangeEvent } from "react"
import { Formik, Field, Form, ErrorMessage } from "formik"
import * as Yup from 'yup';

import styles from "./Form.module.scss"

interface Values {
    email: string
    password: string
}

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Неправильный формат email').required('Введите Email'),
  password: Yup.string()
    .min(8, 'Пароль не должен быть короче 8 символов')
    .required('Введите пароль'),
});

const SignUpForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useAppDispatch()

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
                    const {email, password} = values
                    dispatch(signIn({ email, password }))
                }}
            >
                <Form className={styles.form}>
                    <label className={styles.label} htmlFor="email">Email</label>
                    <Field className={styles.input} id="email" name="email" placeholder="введите email" />
                    <ErrorMessage component="div" name="email" />

                    <label className={styles.label} htmlFor="password">Пароль</label>
                    <Field className={styles.input} id="password" name="password" placeholder="введите пароль" />
                    <ErrorMessage component="div" name="password" />

                    <Button type="submit">Войти</Button>
                </Form>
            </Formik>

            {/* <form
                className={styles.form}
                onSubmit={(e) => {
                    e.preventDefault()
                    dispatch(signIn({ email, password }))
                }}
            >
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
            </form> */}
        </div>
    )
}

export default SignUpForm
