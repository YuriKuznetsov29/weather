import Header from "components/Header/Header"
import SideBar from "components/SideBar/SideBar"
import SingInForm from "../../components/Form/SignInForm"

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
