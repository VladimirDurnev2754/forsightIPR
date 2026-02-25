<script setup lang="ts">
import CardItem from '@/components/CardItem.vue';
import useProducts from './useProducts';

const { data, isLoading, onClickFavorite } = useProducts();
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
        :data-testid="item.id"
        @click-favorite="onClickFavorite(item)"
      />
    </template>
  </div>
</template>
