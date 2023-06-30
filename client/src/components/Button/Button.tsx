import styles from "./Button.module.scss";

interface ButtonrProps {
  children: string;
  onClick?: React.MouseEventHandler;
}

const Button = ({ children, onClick }: ButtonrProps) => {
  return (
    <>
      <button className={styles.btn} onClick={onClick}>
        {children}
      </button>
    </>
  );
};

export default Button;
