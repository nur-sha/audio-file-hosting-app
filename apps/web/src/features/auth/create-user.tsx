import { Box, Flex, Heading } from '@radix-ui/themes';
import Form from '../../components/form/form';
import { FORM_CONFIG, ROLE_FIELD } from './form-config';
import { FormProps } from '../../components/form/form.types';

export type CreateUserFormValues = {
  fullName: string;
  displayName: string;
  email: string;
  password: string;
  role?: 'USER' | 'ADMIN';
};

export type CreateUserProps = Pick<
  FormProps<CreateUserFormValues>,
  'onSubmit'
> & {
  displayRole?: boolean;
  title: string;
  submitBtnLabel: string;
};

const CreateUser = ({
  displayRole,
  title,
  submitBtnLabel,
  onSubmit,
}: CreateUserProps) => {
  const formConfig = displayRole ? [...FORM_CONFIG, ROLE_FIELD] : FORM_CONFIG;
  return (
    <Flex height="50vh" justify="center" align="center">
      <Box
        minWidth={{
          initial: '80%',
          sm: '300px',
        }}
      >
        <Heading align="center" size="8">
          {title}
        </Heading>
        <Form<CreateUserFormValues>
          fields={formConfig}
          submitBtnProps={{ label: submitBtnLabel }}
          onSubmit={onSubmit}
          defaultValues={{ fullName: '', email: '' }}
        />
      </Box>
    </Flex>
  );
};

export default CreateUser;
