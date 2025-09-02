import { emailPattern } from '../../components/form/common-validation';
import { FIELD } from '../../components/form/constant';

export const FULLNAME_FIELD = {
  type: FIELD.TEXT_INPUT,
  name: 'fullName' as 'fullName',
  label: 'Full name',
  placeholder: 'Fullname',
  rules: { required: 'Full name is required' },
};

export const EMAIL_FIELD = {
  type: FIELD.TEXT_INPUT,
  name: 'email' as 'email',
  label: 'Email',
  placeholder: 'Enter email',
  rules: {
    required: 'Enter is required',
    pattern: emailPattern,
  },
};

export const DISPLAY_NAME_FIELD = {
  type: FIELD.TEXT_INPUT,
  name: 'displayName' as 'displayName',
  label: 'Display name',
  placeholder: 'Enter name to be displayed',
  rules: { required: 'Display name is required' },
};

const PASSWORD_FIELD = {
  type: FIELD.SECURE_TEXT_INPUT,
  name: 'password' as 'password',
  label: 'Password',
  placeholder: 'Enter password',
  rules: { required: 'Password is required' },
};

export const FORM_CONFIG = [
  FULLNAME_FIELD,
  DISPLAY_NAME_FIELD,
  EMAIL_FIELD,
  PASSWORD_FIELD,
];

export const ROLE_FIELD = {
  type: FIELD.SELECT,
  name: 'role' as 'role',
  label: 'Role',
  options: [
    { label: 'Admin', value: 'ADMIN' },
    { label: 'User', value: 'USER' },
  ],
  defaultValue: 'USER',
};

export const LOGIN_FORM_CONFIG = [
  {
    ...EMAIL_FIELD,
    placeholder: 'Username',
    label: '',
  },
  { ...PASSWORD_FIELD, placeholder: 'Password', label: '' },
];
