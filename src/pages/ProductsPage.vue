<script setup lang="ts">
import { ECategory } from '@/api/types';
import createMutations from '@/api/mutatuons';
import { useQueryClient } from '@tanstack/vue-query';
import { IProduct } from '@/store/types';
import CardItem from '@/components/CardItem.vue';
import useProducts from './useProducts';

const { useAddMutation } = createMutations(ECategory.Products);
const { mutate: addFavorite } = useAddMutation();

const queryClient = useQueryClient();

function onClickFavorite(item: IProduct) {
  addFavorite(
    { ...item, isFavorite: !item.isFavorite },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['getAll'] });
      },
    }
  );
}
const { data, isLoading } = useProducts();
</script>

<template>
  <div class="grid grid-cols-4 gap-10">
    <h1 v-if="isLoading">Загрузка кроссовок...</h1>

    <template v-else>
      <CardItem
        v-for="item in data"
        :key="item.id"
        :title="item.title"
        :price="item.price"
        :img="item.imageUrl"
        :is-favorite="item.isFavorite"
        @click-favorite="onClickFavorite(item)"
      />
    </template>
  </div>
</template>
