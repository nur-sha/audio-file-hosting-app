import { FIELD } from '../../components/form/constant';

export const FIELDS = [
  {
    type: FIELD.TEXT_INPUT,
    name: 'title' as 'title',
    label: 'Title',
    placeholder: 'Enter audio title',
    rules: { required: 'Display name is required' },
  },
  {
    type: FIELD.TEXT_INPUT,
    name: 'description' as 'description',
    label: 'Description',
    placeholder: 'Enter audio description',
  },

  {
    type: FIELD.UPLOAD,
    name: 'audio' as 'audio',
    label: 'Upload Audio',
    rules: {
      required: 'Audio file is required',
    },
    dropzoneProps: {
      accept: { 'audio/*': [] },
    },
  },
  {
    type: FIELD.SELECT,
    name: 'categoryId' as 'categoryId',
    label: 'Category',
    placeholder: 'Select category',
    rules: {
      required: 'Audio file is required',
    },
    dataSource: { propsMap: 'options', value: 'category' },
  },
];
