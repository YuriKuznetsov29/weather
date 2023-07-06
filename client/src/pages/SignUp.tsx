import Header from "components/Header/Header"
import SideBar from "components/SideBar/SideBar"
import SignUpForm from "components/Form/SignUpForm"
import Backgroud from "components/Background/Background"

const SignUp = () => {

    return (
        <>
            <Header background={true}>
                <SideBar />
            </Header>
            {/* <Backgroud /> */}
            <SignUpForm />
        </>
    )
}

export default SignUp