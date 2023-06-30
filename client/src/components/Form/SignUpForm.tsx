import Button from "components/Button/Button";
import { X } from "@phosphor-icons/react";
import styles from "./Form.module.scss";
import Input from "components/Input/Input";
import { setSignUpState } from "app/slices/loginSlice";
import { useAppDispatch } from "app/hooks";

const SignUpForm = () => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.background_form}>
      <X className={styles.close} weight="bold" onClick={() => dispatch(setSignUpState())} />

      <form className={styles.form}>
        <div className={styles.title}>Регистрация</div>
        <Input label="Логин" placeholder="введите логин" type="text"></Input>
        <Input label="Пароль" placeholder="введите пароль" type="password"></Input>
        <Input label="Пароль" placeholder="повторите пароль" type="password"></Input>
        <Button>Зарегистрироваться</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
