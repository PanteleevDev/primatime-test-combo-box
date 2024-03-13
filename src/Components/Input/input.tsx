import { Path, UseFormRegister } from "react-hook-form";
import { ChangeEvent, FocusEventHandler, InputHTMLAttributes } from "react";

import styles from "./input.module.scss";

type InputProps<T = any> = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  required?: boolean;
  disabled?: boolean;
  name: Path<T>;
  placeholder?: string;
  errorMessage?: string;
} & (
    | {
        register: UseFormRegister<T>;
        validate?: (value: string) => string;
        value?: never;
        onChange?: never;
      }
    | {
        register?: never;
        validate?: never;
        value: string;
        onChange: (event: ChangeEvent<HTMLInputElement>) => void;
      }
  );

export const Input = ({
  register,
  name,
  label,
  required,
  disabled,
  validate,
  errorMessage,
  value,
  placeholder,
  onChange,
  ...rest
}: InputProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.orderContainer}>
        <input
          {...(register
            ? register(name, {
                required: required && "This field is required",
                disabled,
                validate,
              })
            : { name, value, onChange })}
          className={`${styles.input} ${errorMessage && styles.error} ${disabled && styles.disabled}`}
          disabled={disabled}
          placeholder={placeholder}
          {...rest}
        />
        <label className={styles.label}>
          {label}
          {required && "*"}
        </label>
      </div>
      <span
        className={`${styles.errorMessage} ${
          (!errorMessage || disabled) && styles.hideError
        }`}
      >
        {errorMessage}
      </span>
    </div>
  );
};
