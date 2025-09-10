import type {
  DefaultValues,
  FieldValues,
  SubmitHandler,
  Path,
} from 'react-hook-form';
import { FIELD } from './constant';
import { ComponentProps } from 'react';
import { Button } from '@radix-ui/themes';

type DynamicString = {
  [key: string]: string;
};

export type FieldDataSource = {
  propsMap: string;
  value: string;
};

export type FieldConfig<T extends FieldValues> = {
  type: keyof typeof FIELD;
  name: Path<T>;
  label?: string;
  validation?: object;
  transformValue?: string;
  rules?: any;
  events?: DynamicString;
  dataSource?: FieldDataSource;
};

export type FormProps<FormValues extends FieldValues = FieldValues> = {
  fields: FieldConfig<FormValues>[];
  submitBtnProps: { label: string };
  onSubmit: SubmitHandler<FormValues>;
  defaultValues?: DefaultValues<FormValues>;
  btnProps?: ComponentProps<typeof Button>;
  dataSource?: {
    [key: string]: unknown;
  };
};
