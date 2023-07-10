import styles from "./Button.module.scss";

interface ButtonrProps {
  children: string;
  onClick?: React.MouseEventHandler;
  type?: "button" | "submit" | "reset" | undefined
  addStyles?: {}
  disabled?: boolean
}

const Button = ({ children, onClick, type, addStyles, disabled }: ButtonrProps) => {
  return (
    <>
      <button className={styles.btn} style={addStyles} type={type} onClick={onClick} disabled={disabled}>
        {children}
      </button>
    </>
  );
};

export default Button;