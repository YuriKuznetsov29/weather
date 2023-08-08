import { ChangeEvent } from 'react'

interface InputProps {
    label?: string
    inputClassName?: string
    labelClassName?: string
    type: string
    placeholder: string
    value?: string
    dataType?: string
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
    onInput?: (event: ChangeEvent<HTMLInputElement>) => void
}

const Input = ({ label, labelClassName, inputClassName, type, placeholder, value, dataType, onChange, onInput }: InputProps) => {
    return (
        <>
            {label && <label className={labelClassName}>{label}</label>}
            <input
                className={inputClassName}
                value={value}
                type={type}
                data-type={dataType}
                placeholder={placeholder}
                onChange={onChange}
                onInput={onInput}
            ></input>
        </>
    )
}

export default Input
