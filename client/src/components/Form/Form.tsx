import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import { useAppSelector } from "app/hooks";
import { signIn, signUp } from "app/selectors";

const Form = () => {
  const signInState = useAppSelector(signIn);
  const signUpState = useAppSelector(signUp);

  return (
    <>
      {signUpState && <SignUpForm />}
      {signInState && <SignInForm />}
    </>
  );
};

export default Form;
