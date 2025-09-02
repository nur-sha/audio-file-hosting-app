import { Box, Button, Flex, Text } from '@radix-ui/themes';
import { Controller, useForm, type FieldValues } from 'react-hook-form';
import { FIELD_MAP } from './mapping';
import { FormProps } from './form.types';

const Form = <FormValues extends FieldValues>({
  fields,
  submitBtnProps,
  onSubmit,
  defaultValues,
  btnProps = {},
}: FormProps<FormValues>) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex pt="4" direction="column" gap="3" justify="center" align="center">
        {fields.map((item) => {
          const { type, rules, ...rest } = item;
          const Component = FIELD_MAP[type];
          return (
            <Controller
              key={item.name}
              name={item.name}
              control={control}
              rules={rules}
              render={({ field }) => {
                const fieldError = errors?.[field.name];
                return (
                  <Box width="100%">
                    <Text size="2">
                      {item.label} {item.label && rules?.required ? '*' : ''}
                    </Text>
                    {/* @ts-ignore */}
                    <Component {...rest} {...field} />
                    {fieldError && (
                      <Box as="div" width="100%">
                        <Text size="1" color="red">
                          {/* @ts-ignore */}
                          {fieldError.message || 'Field cannot be empty'}
                        </Text>
                      </Box>
                    )}
                  </Box>
                );
              }}
            />
          );
        })}
        <Flex mt="2" justify="center">
          <Button type="submit" size="3" {...btnProps}>
            {submitBtnProps.label}
          </Button>
        </Flex>
      </Flex>
    </form>
  );
};

export default Form;
