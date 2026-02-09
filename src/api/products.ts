import axios from 'axios';
import { UseQueryOptions } from '@tanstack/vue-query';
import useMainStore from '@/store/mainStore';
import { ECategory, IGetProductsParams } from './types';
import { productsUrl } from './mutatuons/constants';

/** Универсальная функция для получения данных по категории. */
export async function getItems({ category, sortPrice, search }: IGetProductsParams) {
  const { data } = await axios.get(productsUrl, {
    params: {
      sortBy: sortPrice || undefined,
      title: search ? `*${search}` : undefined,
      isFavorite: category === ECategory.Favorite || undefined,
    },
  });

  return data;
}

/**
 * Типизированная функция-обёртка для создания query options для useQuery.
 */
export const queryOptions = <TData>(
  category: ECategory,
  params: { sortPrice?: string; search?: string } = {},
  options?: Omit<UseQueryOptions<TData[]>, 'queryKey' | 'queryFn'>
) => {
  return {
    queryKey: [category, params],
    queryFn: () => getItems({ ...params, category }),
    staleTime: Infinity,
    select: (data) => {
      // Side-effect: обновляем store
      const store = useMainStore();
      store.setItems(data);
      return data;
    },
    ...options,
  };
};
