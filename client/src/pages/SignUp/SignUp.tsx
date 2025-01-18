import Header from 'components/Header/Header'
import SideBar from 'components/SideBar/SideBar'
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
