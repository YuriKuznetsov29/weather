import Header from 'components/Header/Header'
import SideBar from 'components/SideBar/SideBar'
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
