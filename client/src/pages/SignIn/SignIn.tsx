import Header from 'widgets/Header/Header'
import SideBar from 'widgets/SideBar/SideBar'
import SingInForm from '../../widgets/Form/SignInForm'

const SignIn = () => {
    return (
        <>
            <Header background={true}>
                <SideBar />
            </Header>
            <SingInForm />
        </>
    )
}

export default SignIn
