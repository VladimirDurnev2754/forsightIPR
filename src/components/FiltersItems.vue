<script setup lang="ts">
import { queryOptions } from '@/api/products';
import { ECategory } from '@/api/types';
import useMainStore from '@/store/mainStore';
import { useQuery } from '@tanstack/vue-query';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const store = useMainStore();
const { sortPrice, searchValue } = storeToRefs(store);

const options = computed(() =>
  queryOptions(
    ECategory.Products,
    {
      search: searchValue.value,
      sortPrice: sortPrice.value,
    },
    {
      enabled: !!searchValue.value || !!sortPrice.value,
    }
  )
);
// useQuery подписывается на изменения options
useQuery(options);
</script>

<template>
  <div class="flex items-center gap-4">
    <select
      class="py-2 px-3 border border-gray-200 focus:border-gray-400 rounded-md focus:outline-none"
      v-model="sortPrice"
    >
      <option value="">Def</option>
      <option value="price">По цене (дешевые)</option>
      <option value="-price">По цене (дорогие)</option>
    </select>
    <div class="relative">
      <input
        type="text"
        class="border border-gray-200 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:border-gray-400"
        placeholder="Поиск..."
        v-model="searchValue"
      />
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <img src="/search.svg" />
      </div>
    </div>
  </div>
</template>
