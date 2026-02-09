<script setup lang="ts">
import { ECategory } from '@/api/types';
import { queryOptions } from '@/api/products';
import createMutations from '@/api/mutatuons';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { IProduct } from '@/store/types';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import useMainStore from '@/store/mainStore';
import { storeToRefs } from 'pinia';
import Card from '../components/CardItem.vue';

const { useAddMutation } = createMutations(ECategory.Products);
const { mutate: addFavorite } = useAddMutation();

const queryClient = useQueryClient();

function onClickFavorite(item: IProduct) {
  addFavorite(
    { ...item, isFavorite: !item.isFavorite },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [ECategory.Products] });
      },
    }
  );
}

const route = useRoute();
const category = computed(() => route.meta.category);
const store = useMainStore();
const { sortPrice, searchValue } = storeToRefs(store);

const options = computed(() =>
  queryOptions(category.value, {
    search: searchValue.value,
    sortPrice: sortPrice.value,
  })
);
useQuery(options);

const { getProducts } = storeToRefs(store);
</script>

<template>
  <div class="grid grid-cols-4 gap-10">
    <Card
      v-for="item in getProducts"
      :key="item.id"
      :title="item.title"
      :price="item.price"
      :img="item.imageUrl"
      :is-favorite="item.isFavorite"
      @click-favorite="onClickFavorite(item)"
    />
  </div>
</template>
