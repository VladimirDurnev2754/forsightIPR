<script setup lang="ts">
import { ECategory } from "@/api/types";
import Card from "../components/Card.vue";
import { useMainStore } from "../store/mainStore";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { queryOptions } from "@/api/products";
import { createMutations } from "@/api/mutatuons";
import { useIsFetching, useQuery, useQueryClient } from "@tanstack/vue-query";
import { IProduct } from "@/store/types";
import { useRoute } from "vue-router";

const store = useMainStore();

const { price, search } = storeToRefs(store);

const searchValue = ref("");
const sortValue = ref("name");

const { useAddMutation } = createMutations(ECategory.Favorite);
const { mutate: addFavorite } = useAddMutation();


const queryClient = useQueryClient();

function onClickFavorite(item) {
  addFavorite(item, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ECategory.Products] });
    },
  });
}

const route = useRoute();
// const category = computed(() => route.meta.category);

const { data, isPending, isError, isFetching, error } = useQuery<IProduct[]>(queryOptions(route.meta.category));
const isFetchingGlobal = useIsFetching()
</script>

<template>
  <div v-if="isFetchingGlobal">Refreshing ALL...</div>
  <div v-if="isFetching">Refreshing...</div>
  <span v-if="isPending">Loading...</span>
  <span v-else-if="isError">Error: {{ error?.message }}</span>
  <div class="grid grid-cols-4 gap-10">
    <Card v-for="item in data" :key="item.id" :title="item.title" :price="item.price" :img="item.imageUrl"
      :is-favorite="item.isFavorite" @click-favorite="onClickFavorite(item)" />
  </div>
</template>
