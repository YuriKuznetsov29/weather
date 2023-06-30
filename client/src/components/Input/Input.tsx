import styles from "./Input.module.scss";

interface InputProp {
  label: string;
  type: string;
  placeholder: string;
}

const Input = ({ label, type, placeholder }: InputProp) => {
  return (
    <>
      <label className={styles.label}>{label}</label>
      <input className={styles.input} type={type} placeholder={placeholder}></input>
    </>
  );
};

export default Input;
