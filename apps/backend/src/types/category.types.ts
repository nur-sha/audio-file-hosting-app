import { CategoryModel } from '../models/category.model';

export type CategoryCreatePayload = Pick<CategoryModel, 'name' | 'description'>;
