import { Button, Flex, IconButton, TextField } from '@radix-ui/themes';
import { useState } from 'react';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';

export type SecureTextFieldProps = {
  value: string;
  onChange?: (params: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  autoComplete?: string;
};

const SecureTextInput = ({
  value,
  onChange,
  placeholder = 'Password',
}: SecureTextFieldProps) => {
  const [showText, setShowText] = useState(false);

  const handleClick = () => {
    setShowText(!showText);
  };

  return (
    <TextField.Root
      type={showText ? 'text' : 'password'}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      autoComplete="off"
      autoCapitalize="off"
      autoCorrect="off"
      spellCheck="false"
      style={{ width: '100%' }}
    >
      <TextField.Slot side="right">
        <Flex onClick={handleClick} style={{ cursor: 'pointer' }}>
          {showText ? <EyeClosedIcon /> : <EyeOpenIcon />}
        </Flex>
      </TextField.Slot>
    </TextField.Root>
  );
};

export default SecureTextInput;
