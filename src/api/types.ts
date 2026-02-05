export enum ECategory {
  Favorite = 'favorite',
  Products = 'products',
  Cart = 'cart',
}

export interface IGetProductsParams {
  price?: string | undefined;
  search?: string | undefined;
  category?: ECategory | undefined;
}
