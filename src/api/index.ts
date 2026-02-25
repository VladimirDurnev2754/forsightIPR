import axios from 'axios';
import { useMutation, UseQueryOptions } from '@tanstack/vue-query';
import { IProduct } from '@/store/types';
import { ECategory, IParams } from './types';
import { APOLLO_URL, productsUrl } from './constants';

export const fetchSneakers = async ({
  category,
  search,
  sortPrice,
  includeId,
  includeTitle,
  includePrice,
  includeImageUrl,
  includeIsAdded,
  includeIsFavorite,
}: IParams) => {
  const { data } = await axios.post(APOLLO_URL, {
    query: `#graphql
      query GetProducts(
        $category: String,
        $search: String, 
        $sortPrice: String,
        $includeId: Boolean!,
        $includeTitle: Boolean!,
        $includePrice: Boolean!,
        $includeImageUrl: Boolean!,
        $includeIsAdded: Boolean!,
        $includeIsFavorite: Boolean!,
      ) {
        products(
          category: $category
          search: $search
          sortPrice: $sortPrice
        ) {
          id @include(if: $includeId)
          title @include(if: $includeTitle)
          price @include(if: $includePrice)
          imageUrl @include(if: $includeImageUrl)
          isAdded @include(if: $includeIsAdded)
          isFavorite @include(if: $includeIsFavorite)
        }
      }
    `,
    variables: {
      category,
      search,
      sortPrice,
      includeId: includeId ?? true,
      includeTitle: includeTitle ?? true,
      includePrice: includePrice ?? true,
      includeImageUrl: includeImageUrl ?? true,
      includeIsAdded: includeIsAdded ?? true,
      includeIsFavorite: includeIsFavorite ?? true,
    },
  });
  return data;
};

/**
 * Типизированная функция-обёртка для создания query options для useQuery.
 */
export const queryOptions = <TData>(
  category: ECategory,
  params: IParams,
  options?: Omit<UseQueryOptions<TData[]>, 'queryKey' | 'queryFn'>
) => {
  return {
    queryKey: ['getAll', category, params],
    queryFn: () => fetchSneakers({ ...params, category }),
    staleTime: Infinity,
    select: (data) => {
      return data.data.products;
    },
    ...options,
  };
};

/**
 * Фабрика хуков для мутаций по категориям товаров
 */
export const createMutations = (options?) => {
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
