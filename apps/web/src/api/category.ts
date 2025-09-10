import { makeApiRequest } from './api';
import { CategoryCreatePayload } from './interfaces/category.types';
import { API_ROUTES } from './routes';

export const getAllCategories = () => {
  return makeApiRequest(API_ROUTES.category);
};

export const createCategories = (data: CategoryCreatePayload) => {
  return makeApiRequest(API_ROUTES.category, 'POST', { data });
};
