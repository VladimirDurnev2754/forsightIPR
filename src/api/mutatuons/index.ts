import axios from 'axios';
import { useMutation } from '@tanstack/vue-query';
import { IProduct } from '@/store/types';
import { ECategory } from '../types';
import { APOLLO_URL } from '../constants';
import { productsUrl } from './constants';

/**
 * Фабрика хуков для мутаций по категориям товаров
 */
const createMutations = (category: ECategory, options?) => {
  return {
    useAddMutation: () =>
      useMutation({
        mutationFn: async (dataItem: IProduct) => {
          const response = await axios.post(APOLLO_URL, {
            query: `#graphql
            mutation UpdateProduct($url: String, $updateItem: ProductInput!) {
              updateProduct(url: $url, updateItem: $updateItem,) {
                id,
                title,
                price,
                imageUrl,
                isAdded,
                isFavorite,
              }
            }
          `,
            variables: {
              url: `${productsUrl}${dataItem.id}`,
              updateItem: {
                isFavorite: dataItem.isFavorite,
                isAdded: dataItem.isAdded,
                title: dataItem.title,
                price: dataItem.price,
                imageUrl: dataItem.imageUrl,
              },
            },
          });

          return response.data.data.updateProduct;
        },
        onError: (error) => console.error('Ошибка запроса:', error),
        ...options,
      }),
  };
};

export default createMutations;
