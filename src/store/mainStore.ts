import axios from 'axios';
import { defineStore } from 'pinia'
import { IMainStore, IProduct } from './types';

export const useMainStore = defineStore('MainStore', {
  state: (): IMainStore => ({
    items: [],
    loading: false,
    error: null,
    price: '',
    search: '',
    favoriteItems: [],
    satus: {},
  }),

  getters: {
    sneakersItems: (state): IProduct[] => state.items,
    getFavoriteItems: (state): IProduct[] => state.favoriteItems,
  },

  actions: {
    setPrice(price: string) {
      this.price = price
    },
    setFavoriteItems(items: IProduct[]) {
      this.favoriteItems = items
    },
    setItems(items: IProduct[]) {
      this.items = items
    }
  },
})