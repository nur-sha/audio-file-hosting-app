import { Box, Flex, Separator, Text, Link as UILink } from '@radix-ui/themes';
import Form from '../../components/form/form';
import { LOGIN_FORM_CONFIG } from './form-config';
import { FormProps } from '../../components/form/form.types';

export type LoginFormFieldValues = {
  email: string;
  password: string;
};
export type LoginFormProps = Pick<FormProps<LoginFormFieldValues>, 'onSubmit'>;

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  return (
    <Flex pt="4" direction="column" gap="3" justify="center" align="center">
      <Form
        fields={LOGIN_FORM_CONFIG}
        submitBtnProps={{ label: 'Login' }}
        onSubmit={onSubmit}
      />
      <Box>
        <Separator mb="2" mt="1" size="4" />
        <Text as="span" size="2">
          Don't have an account?{' '}
        </Text>
        <UILink href="/register" size="2">
          Sign up
        </UILink>
      </Box>
    </Flex>
  );
};

export default LoginForm;
