import styles from "./Input.module.scss"
import { ChangeEvent } from "react"

interface InputProp {
  label: string
  type: string
  placeholder: string
  value: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const Input = ({ label, type, placeholder, value, onChange }: InputProp) => {
  return (
    <>
      <label className={styles.label}>{label}</label>
      <input
        className={styles.input}
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      ></input>
    </>
  )
}

export default Input
