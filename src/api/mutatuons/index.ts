import axios, { AxiosResponse } from 'axios'
import { useMutation, UseMutationOptions, UseMutationReturnType } from '@tanstack/vue-query';
import { categoryUrls } from './constants';
import { ECategory } from '../types';
import { IProduct } from '@/store/types';

/**
 * Универсальная фабрика хуков для мутаций по категориям.
 */
export const createMutations = (category: ECategory) => {
    const url = categoryUrls[category]
    /**
     * Функция-обёртка для useMutation с обработкой ошибок.
     */
    const useBaseMutation = <TData, TVariables>(
        mutationFn: (variables: TVariables) => Promise<TData>,
        options?: UseMutationOptions<TData, Error, TVariables, unknown>
    ): UseMutationReturnType<TData, Error, TVariables, unknown> =>
        useMutation<TData, Error, TVariables, unknown>({
            mutationFn,
            onError: (error) => console.error('Ошибка запроса:', error),
            onSuccess: () => console.log('Успешно!'),
            ...options,
        })
    const toggleFavorite = (data: IProduct) =>
        axios.patch(`${categoryUrls[ECategory.Products]}/${data.id}`, { isFavorite: !data.isFavorite });

    return {
        /** Хук для удаления элемента из категории. */
        useDeleteMutation: () =>
            useBaseMutation<AxiosResponse, IProduct>(
                (data) =>
                    axios.delete(`${url}/${data.id}`)

            ),
        /** Хук для добавления элемента в категорию. */
        useAddMutation: () =>
            useBaseMutation<AxiosResponse, IProduct>(
                async (data) => {
                    await toggleFavorite(data);
                    if (data.isFavorite) {
                        axios.delete(`${url}/${data.id}`)
                    }
                    return axios.post(url, data);
                },
                { onSuccess: () => console.log('Успешно добавлено!') }
            )
    }
}
