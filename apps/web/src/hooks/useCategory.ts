import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { CategoryListResponse } from '../api/interfaces/category.types';
import { getAllCategories } from '../api/category';

type Options = Omit<
  UseQueryOptions<CategoryListResponse, Error>,
  'queryKey' | 'queryFn'
>;

export const useCategory = (options?: Options) => {
  const { data: { data: categories } = {}, ...rest } =
    useQuery<CategoryListResponse>({
      queryKey: ['categories'],
      queryFn: getAllCategories,
      staleTime: 1000 * 60 * 5,
      ...options,
    });

  return { categories, ...rest };
};
