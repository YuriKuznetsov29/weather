import Header from 'components/Header/Header'
import SideBar from 'widgets/SideBar/SideBar'
import SignUpForm from 'components/Form/SignUpForm'

const SignUp = () => {
    return (
        <>
            <Header background={true}>
                <SideBar />
            </Header>
            <SignUpForm />
        </>
    )
}

export default SignUp
