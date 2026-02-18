<script setup lang="ts">
import createMutations from '@/api/mutatuons';
import { useQueryClient } from '@tanstack/vue-query';
import { IProduct } from '@/store/types';
import CardItem from '@/components/CardItem.vue';
import useProducts from './useProducts';

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

// const onClickItem = () => {

// }

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
