export interface IProduct {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  isFavorite: boolean;
}

export interface IMainStore {
  items: IProduct[];
  loading: boolean;
  error: string | null;
  price: string;
  search: string;
  favoriteItems: IProduct[];
  satus: {};
}
