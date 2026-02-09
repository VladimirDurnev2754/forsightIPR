import axios from 'axios';
import { useMutation } from '@tanstack/vue-query';
import { IProduct } from '@/store/types';
import { categoryUrls } from './constants';
import { ECategory } from '../types';

/**
 * Фабрика хуков для мутаций по категориям товаров
 */
const createMutations = (category: ECategory, options?) => {
  const url = categoryUrls[category];

  return {
    useAddMutation: () =>
      useMutation({
        mutationFn: (data: IProduct) => axios.patch(`${url}/${data.id}`, data),
        onError: (error) => console.error('Ошибка запроса:', error),
        ...options,
      }),
  };
};

export default createMutations;
