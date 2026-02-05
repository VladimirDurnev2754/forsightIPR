import axios from 'axios'
import { ECategory, getProductsParams } from './types';
import { useQuery, UseQueryOptions } from '@tanstack/vue-query';
import { API_URL } from './constants';
import { IProduct } from '@/store/types';

/** Универсальная функция для получения данных по категории. */
export async function getItems({ price, search, category }: getProductsParams) {
    const { data } = await axios.get(`${API_URL}${category}`, {
        params: {
            category: price || undefined,
            search: search || undefined,
        },
    })

    return data
}

/**
 * Типизированная функция-обёртка для создания query options для useQuery.
 */
export const queryOptions = <TData>(
    category: ECategory,
    params: { price?: string; search?: string } = {},
    options?: UseQueryOptions<TData[]>
): UseQueryOptions<TData[]> => {
    return {
        queryKey: [category, params],
        queryFn: () => getItems({ ...params, category }),
        staleTime: Infinity,
        ...options,
    };
}
