import { ApiCommonResponse, ApiResponse } from './api';

export type Category = ApiCommonResponse & {
  id: string;
  name: string;
  description?: string;
};

export type CategoryListResponse = ApiResponse<Category[]>;

export type CategoryCreatePayload = Pick<Category, 'name' | 'description'>;
