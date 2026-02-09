export enum ECategory {
  Favorite = 'favorite',
  Products = 'products',
  Cart = 'cart',
}

export interface IGetProductsParams {
  sortPrice?: string | undefined;
  search?: string | undefined;
  favorite?: boolean | undefined;
  category: ECategory;
}
