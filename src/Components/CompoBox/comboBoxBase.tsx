import { Path } from "react-hook-form";
import { ChangeEvent, useCallback, useState } from "react";
import { Input } from "Components/Input/input";

import styles from "./comboBox.module.scss";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useDismiss,
  useRole,
  useFocus,
  useInteractions,
  FloatingFocusManager,
} from "@floating-ui/react";
import CloseIcon from "../../assets/icons-close.svg";

type InputProps<T = any> = {
  label: string;
  required?: boolean;
  disabled?: boolean;
  name: Path<T>;
  placeholder?: string;
  errorMessage?: string;
  options: string[];
  isLoading?: boolean;
  onSearchChange?: (val: string) => void;
  value?: string;
  onChange?: (event: string) => void;
};

export const ComboBoxBase = ({
  name,
  label,
  required,
  disabled,
  errorMessage,
  value = "",
  placeholder,
  onChange,
  isLoading,
  options,
  onSearchChange,
}: InputProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [comboboxValue, setComboboxValue] = useState("");

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: (open) => {
      setIsOpen(open);
      if (!open) {
        setInputValue(comboboxValue);
        onSearchChange?.(comboboxValue);
      }
    },
    middleware: [offset({ mainAxis: -20 }), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const handleSelectOption = (option: string) => {
    setInputValue(option);
    setComboboxValue(option);
    onSearchChange?.(option);
    onChange?.(option);
  };

  const focus = useFocus(context);

  const dismiss = useDismiss(context);
  const role = useRole(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([
    focus,
    dismiss,
    role,
  ]);

  const onDeleteClick = useCallback(() => {
    if (disabled) return;
    setInputValue("");
    onSearchChange?.("");
    setComboboxValue("");
    onChange?.("");
    setIsOpen(true);
  }, [setInputValue, onSearchChange, disabled]);

  return (
    <>
      <div ref={refs.setReference} {...getReferenceProps()}>
        <div className={styles.inputContainer}>
          <Input
            label={label}
            name={name}
            required={required}
            disabled={disabled}
            placeholder={placeholder}
            value={inputValue}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setInputValue(e.target.value);
              onSearchChange?.(e.target.value);
            }}
            errorMessage={errorMessage}
            autoComplete={"off"}
          />
          {comboboxValue && (
            <CloseIcon className={styles.deleteIcon} onClick={onDeleteClick} />
          )}
        </div>
        <div className={styles.ref}>
          {isOpen && (!!options?.length || isLoading) && (
            <FloatingFocusManager
              context={context}
              modal={false}
              // do not focus
              initialFocus={-1}
            >
              <div
                className={styles.listContainer}
                ref={refs.setFloating}
                style={floatingStyles}
                {...getFloatingProps()}
              >
                {isLoading ? (
                  <>loading...</>
                ) : (
                  <ul className={styles.list}>
                    {options?.map((el, i) => (
                      <li
                        className={styles.listItem}
                        key={i}
                        onClick={() => {
                          handleSelectOption(el);
                          setIsOpen(false);
                        }}
                      >
                        {el}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </FloatingFocusManager>
          )}
        </div>
      </div>
    </>
  );
};
