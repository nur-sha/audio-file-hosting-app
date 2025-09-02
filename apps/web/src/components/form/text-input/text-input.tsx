import { TextField } from '@radix-ui/themes';
import type { ComponentProps } from 'react';

export type NumberFieldProps = {
  value: number;
  onChange?: (params: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  inputProps?: ComponentProps<typeof TextField.Root>;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  disabled?: boolean;
};

const TextInput = ({
  value,
  onChange,
  placeholder,
  inputProps = {},
  onKeyUp,
  disabled,
}: NumberFieldProps) => {
  return (
    <TextField.Root
      style={{ width: '100%' }}
      type="text"
      placeholder={placeholder}
      {...inputProps}
      onChange={onChange}
      value={value}
      disabled={disabled}
    />
  );
};

export default TextInput;
