import { defineStore } from 'pinia';
import { IMainStore, IProduct } from './types';

const useMainStore = defineStore('MainStore', {
  state: (): IMainStore => ({
    items: [],
    sortPrice: '',
    searchValue: '',
  }),

  getters: {
    getProducts: (state): IProduct[] => state.items,
    getSortPrice: (state): string => state.sortPrice,
    getSearchValue: (state): string => state.searchValue,
  },

  actions: {
    setItems(items: IProduct[]) {
      this.items = items;
    },
    setSortPrice(value: string) {
      this.sortPrice = value;
    },
    setSearchValue(value: string) {
      this.searchValue = value;
    },
  },
});

export default useMainStore;
