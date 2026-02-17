import { queryOptions } from '@/api/products';
import { useQuery, UseQueryReturnType } from '@tanstack/vue-query';
import { computed } from 'vue';
import useMainStore from '@/store/mainStore';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';

const useProducts = (): UseQueryReturnType<any, Error> => {
  const store = useMainStore();
  const route = useRoute();
  const category = computed(() => route.meta.category);
  const { sortPrice, searchValue } = storeToRefs(store);

  // 1. Опции запроса (реактивные)
  const options = computed(() =>
    queryOptions(category.value, {
      search: searchValue.value,
      sortPrice: sortPrice.value,
    })
  );

  // 2. Основной запрос
  const query = useQuery(options);

  // 3. Инвалидация (можно вынести сюда же)
  //   const refresh = () => queryClient.invalidateQueries({ queryKey: [ECategory.Products] });

  return {
    ...query, // data, isLoading, и т.д.
    // refresh,
  };
};

export default useProducts;
