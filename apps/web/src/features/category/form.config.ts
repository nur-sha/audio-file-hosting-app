import { FIELD } from '../../components/form/constant';

export const CATEGORY_NAME = {
  type: FIELD.TEXT_INPUT,
  name: 'name' as 'name',
  label: 'Name',
  placeholder: 'Enter category name',
  rules: { required: 'Category name is required' },
};

export const CATEGORY_DESCRIPTION = {
  type: FIELD.TEXT_INPUT,
  name: 'description' as 'description',
  label: 'Description',
  placeholder: 'Enter category description',
};

export const FIELDS = [CATEGORY_NAME, CATEGORY_DESCRIPTION];
