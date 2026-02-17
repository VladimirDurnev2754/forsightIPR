import axios from 'axios';
import { UseQueryOptions } from '@tanstack/vue-query';
import { ECategory } from './types';
import { APOLLO_URL } from './constants';

interface IParams {
  category?: ECategory;
  search?: string;
  sortPrice?: string;
  includeId?: boolean;
  includeTitle?: boolean;
  includePrice?: boolean;
  includeImageUrl?: boolean;
  includeIsAdded?: boolean;
  includeIsFavorite?: boolean;
}

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
