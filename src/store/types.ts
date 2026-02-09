export interface IProduct {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  isFavorite: boolean;
}

export interface IMainStore {
  items: IProduct[];
  sortPrice: string;
  searchValue: string;
}
