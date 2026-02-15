<script lang="ts" setup>
interface ICardProps {
  title: string;
  img: string;
  price: number;
  isFavorite: boolean;
  onClickFavorite: () => void;
}

const { title, img, price, isFavorite, onClickFavorite } = defineProps<ICardProps>();
console.log('img', img);
</script>

<template>
  <div
    class="relative flex flex-col w-full border border-slate-100 rounded-xl p-8 cursor-pointer transition hover:shadow-xl hover:transform hover:-translate-y-2"
  >
    <div class="absolute top-8 left-8">
      <img
        :src="isFavorite ? '/like-2.svg' : '/like-1.svg'"
        alt="Favorite"
        @click="onClickFavorite"
        @keydown="onClickFavorite"
      />
    </div>
    <img :src="img" class="w-full" alt="Sneaker" />
    <p>{{ title }}</p>
    <div class="flex justify-between mt-5">
      <div class="flex flex-col gap-2">
        <span class="text-slate-200">Цена:</span>
        <span class="font-bold">{{ price }} руб.</span>
      </div>
      <img src="/plus.svg" alt="Plus" />
    </div>
  </div>
</template>
