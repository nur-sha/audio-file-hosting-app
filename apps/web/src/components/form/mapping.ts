import { FIELD } from './constant';
import { SecureTextInput } from './secure-text-input';
import { Select } from './select';
import { TextInput } from './text-input';
import { Upload } from './upload';

export const FIELD_MAP = {
  [FIELD.TEXT_INPUT]: TextInput,
  [FIELD.SECURE_TEXT_INPUT]: SecureTextInput,
  [FIELD.SELECT]: Select,
  [FIELD.UPLOAD]: Upload,
};
