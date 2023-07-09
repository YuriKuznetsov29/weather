import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import { useAppSelector } from "app/hooks";
import { signInSelector, signUpSelector } from "app/selectors";

const Form = () => {
  const signInState = useAppSelector(signInSelector);
  const signUpState = useAppSelector(signUpSelector);

  return (
    <>
      {signUpState && <SignUpForm />}
      {signInState && <SignInForm />}
    </>
  );
};

export default Form;
