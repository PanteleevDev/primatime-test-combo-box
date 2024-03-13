import { Control, Controller } from "react-hook-form";

import { ComboBoxBase } from "./comboBoxBase";

type InputProps<T extends string = string> = {
  label: string;
  required?: boolean;
  disabled?: boolean;
  name: string;
  placeholder?: string;
  errorMessage?: string;
  options: T[];
  isLoading?: boolean;
  onSearchChange?: (val: string) => void;
} & (
  | {
      control?: Control<any>;
      value?: never;
      onChange?: never;
    }
  | {
      control?: never;
      value?: T;
      onChange?: (val: T) => void;
    }
);

export const ComboBox = ({ control, ...rest }: InputProps) => {
  return (
    <>
      {control ? (
        <Controller
          name={rest.name}
          control={control}
          rules={{ required: rest.required && "This field is required" }}
          render={({ field }) => (
            <ComboBoxBase
              {...rest}
              value={field.value}
              onChange={field.onChange}
            />
          )}
          {...rest}
        />
      ) : (
        <ComboBoxBase {...rest} />
      )}
    </>
  );
};
