<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import PageLayout from '@/components/PageLayout.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <VueQueryDevtools />
  <PageLayout :title="route.meta.title">
    <router-view />
  </PageLayout>
</template>
