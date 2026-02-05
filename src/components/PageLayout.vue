<script setup lang="ts">
import Filters from "./Filters.vue";
import Header from "./Header.vue";

defineProps<{ title: string }>();
</script>

<template>
  <div class="bg-white w-3/5 m-auto rounded-xl shadow-xl shadow-grey-200 mt-20">
    <Header />
    <div class="p-10">
      <div class="flex justify-between items-center mb-10">
        <h1 class="text-3xl font-bold">{{ title }}</h1>
        <Filters />
      </div>
      <slot />
    </div>
  </div>
</template>
