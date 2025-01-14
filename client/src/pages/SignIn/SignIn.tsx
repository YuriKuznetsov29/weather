import Header from 'widgets/Header/Header'
import SideBar from 'widgets/SideBar/SideBar'
import { SignInForm } from 'modules/Authorization'
const SignIn = () => {
    return (
        <>
            <Header background={true}>
                <SideBar />
            </Header>
            <SignInForm />
        </>
    )
}

export default SignIn
