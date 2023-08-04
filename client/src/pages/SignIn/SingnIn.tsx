import Header from 'components/Header/Header'
import SideBar from 'widgets/SideBar/SideBar'
import SingInForm from '../../components/Form/SignInForm'

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
