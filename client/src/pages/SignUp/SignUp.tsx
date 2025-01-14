import Header from 'widgets/Header/Header'
import SideBar from 'widgets/SideBar/SideBar'
import { SignUpForm } from 'modules/Authorization'
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
