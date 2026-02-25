export enum ECategory {
  Favorite = 'favorite',
  Products = 'products',
  Cart = 'cart',
}

export interface IGetProductsParams {
  sortPrice?: string | undefined;
  search?: string | undefined;
  favorite?: boolean | undefined;
  category?: ECategory;
}

export interface IParams {
  category?: ECategory;
  search?: string;
  sortPrice?: string;
  includeId?: boolean;
  includeTitle?: boolean;
  includePrice?: boolean;
  includeImageUrl?: boolean;
  includeIsAdded?: boolean;
  includeIsFavorite?: boolean;
}
