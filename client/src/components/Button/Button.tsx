import styles from "./Button.module.scss";

interface ButtonrProps {
  children: string;
  onClick?: React.MouseEventHandler;
  type?: "button" | "submit" | "reset" | undefined
  addStyles?: {}
}

const Button = ({ children, onClick, type, addStyles }: ButtonrProps) => {
  return (
    <>
      <button className={styles.btn} style={addStyles} type={type} onClick={onClick}>
        {children}
      </button>
    </>
  );
};

export default Button;