import Button from 'shared/ui/Button/Button'
import { Eye, EyeSlash } from '@phosphor-icons/react'
import { useAppDispatch, useAppSelector } from 'app/providers/StoreProvider/config/hooks'
import { useState, useEffect } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useLocation, useNavigate } from 'react-router-dom'
import Spinner from 'shared/ui/Spinner/Spinner'
import { authStatusSelector, serverErrorsSelector, statusSelector } from '../../store/selectors'
import styles from './Form.module.scss'
import { signIn } from 'modules/Authorization/api/signIn'

interface Values {
    email: string
    password: string
}

const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Неправильный формат email').required('Введите Email'),
    password: Yup.string()
        .min(8, 'Пароль не должен быть короче 8 символов')
        .required('Введите пароль'),
})

const SignUpForm = () => {
    const [showPassword, setShowPassword] = useState('password')

    const dispatch = useAppDispatch()
    const auth = useAppSelector(authStatusSelector)
    const loadStatus = useAppSelector(statusSelector)
    const serverError = useAppSelector(serverErrorsSelector)

    const navigate = useNavigate()
    const location = useLocation()
    const fromPage = location.state?.from?.pathname || '/'

    const toggleShowPassword = () => {
        if (showPassword === 'password') {
            setShowPassword('text')
        } else {
            setShowPassword('password')
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
                    email: '',
                    password: '',
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
                    <div className={styles.inputWrapper}>
                        <Field
                            className={styles.input}
                            id="email"
                            name="email"
                            placeholder="введите email"
                        />
                        <ErrorMessage className={styles.fieldError} component="div" name="email" />
                    </div>

                    <label className={styles.label} htmlFor="password">
                        Пароль
                    </label>
                    <div className={styles.inputWrapper}>
                        <Field
                            className={`${styles.input} ${styles.lastInput}`}
                            id="password"
                            name="password"
                            type={showPassword}
                            placeholder="введите пароль"
                        />
                        <div className={styles.passwordEye} onClick={toggleShowPassword}>
                            {showPassword === 'password' ? (
                                <EyeSlash size={22} color="#000" />
                            ) : (
                                <Eye size={22} color="#000" />
                            )}
                        </div>
                        <ErrorMessage
                            className={`${styles.fieldError} ${styles.fieldErrorLats}`}
                            component="div"
                            name="password"
                        />
                        <div className={styles.error}>
                            {loadStatus === 'loading' ? (
                                <Spinner smallSize={true} />
                            ) : (
                                serverError && <div>{serverError}</div>
                            )}
                        </div>
                    </div>

                    <Button type="submit" disabled={loadStatus === 'loading' ? true : false}>
                        Войти
                    </Button>
                </Form>
            </Formik>
        </div>
    )
}

export default SignUpForm
