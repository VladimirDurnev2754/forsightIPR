<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  modelValue?: string;
  sortValue?: string;
}>();

const emit = defineEmits(['update:modelValue', 'update:sortValue']);

const search = ref(props.modelValue);
const sort = ref(props.sortValue);

watch(search, (val) => emit('update:modelValue', val));
watch(sort, (val) => emit('update:sortValue', val));
</script>

<template>
  <div class="flex items-center gap-4">
    <select
      class="py-2 px-3 border border-gray-200 focus:border-gray-400 rounded-md focus:outline-none"
      v-model="sort"
    >
      <option value="name">По названию</option>
      <option value="price-asc">По цене (дешевые)</option>
      <option value="price-desc">По цене (дорогие)</option>
    </select>
    <div class="relative">
      <input
        type="text"
        class="border border-gray-200 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:border-gray-400"
        placeholder="Поиск..."
        v-model="search"
      />
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <img src="/search.svg" />
      </div>
    </div>
  </div>
</template>
