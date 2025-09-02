import { Select as RadixSelect } from '@radix-ui/themes';

export type Options = {
  value: string;
  label: string;
};

export type SelectProps = {
  options: Options[];
  placeholder: string;
  defaultValue?: string;
  onChange: (value: string) => void;
};

const Select = ({
  defaultValue,
  placeholder,
  options,
  onChange,
}: SelectProps) => {
  const handleChange = (value: string) => {
    onChange(value);
  };
  return (
    <RadixSelect.Root defaultValue={defaultValue} onValueChange={handleChange}>
      <RadixSelect.Trigger placeholder={placeholder} />
      <RadixSelect.Content>
        {options.map((item) => {
          return (
            <RadixSelect.Item key={item.label} value={item.value}>
              {item.label}
            </RadixSelect.Item>
          );
        })}
      </RadixSelect.Content>
    </RadixSelect.Root>
  );
};

export default Select;
