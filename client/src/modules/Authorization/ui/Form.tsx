import SignUpForm from './SignUpForm/SignUpForm'
import SignInForm from './SignInForm/SignInForm'
import { useAppSelector } from 'app/redux/hooks'
import { signInSelector, signUpSelector } from '../store/selectors'

const Form = () => {
    const signInState = useAppSelector(signInSelector)
    const signUpState = useAppSelector(signUpSelector)

    return (
        <>
            {signUpState && <SignUpForm />}
            {signInState && <SignInForm />}
        </>
    )
}

export default Form
