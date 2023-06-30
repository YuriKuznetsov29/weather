import Button from "components/Button/Button";
import { X } from "@phosphor-icons/react";
import styles from "./Form.module.scss";
import Input from "components/Input/Input";
import { useAppDispatch } from "app/hooks";
import { setSignInState } from "app/slices/loginSlice";

const SignUpForm = () => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.background_form}>
      <X className={styles.close} weight="bold" onClick={() => dispatch(setSignInState())} />

      <form className={styles.form}>
        <div className={styles.title}>Вход</div>
        <Input label="Логин" placeholder="введите логин" type="text"></Input>
        <Input label="Пароль" placeholder="введите пароль" type="password"></Input>
        <Button>Войти</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
