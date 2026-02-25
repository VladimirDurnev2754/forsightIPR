import { createMutations, queryOptions } from '@/api';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { computed } from 'vue';
import useMainStore from '@/store/mainStore';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { IProduct } from '@/store/types';

const useProducts = () => {
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

  const { useAddMutation } = createMutations();
  const { mutate: addFavorite } = useAddMutation();
  const queryClient = useQueryClient();

  const onClickFavorite = (item: IProduct) => {
    addFavorite(
      { ...item, isFavorite: !item.isFavorite },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['getAll'] });
        },
      }
    );
  };

  return {
    ...query,
    onClickFavorite,
  };
};

export default useProducts;
