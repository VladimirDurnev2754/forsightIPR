export interface IProduct {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  isAdded: boolean;
  isFavorite: boolean;
}

export interface IMainStore {
  items: IProduct[];
  sortPrice: string;
  searchValue: string;
}
