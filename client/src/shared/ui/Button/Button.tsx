import styles from './Button.module.scss'

interface ButtonProps {
    children: string
    onClick?: React.MouseEventHandler
    type?: 'button' | 'submit' | 'reset' | undefined
    addStyles?: {}
    disabled?: boolean
}

const Button = ({ children, onClick, type, addStyles, disabled }: ButtonProps) => {
    return (
        <button
            className={styles.btn}
            type={type}
            style={addStyles}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

export default Button
