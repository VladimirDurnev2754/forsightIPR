export enum ECategory {
    Favorite = 'favorite',
    Products = 'products',
    Cart = 'cart',
}

export interface getProductsParams {
    price?: string | undefined;
    search?: string | undefined;
    category?: ECategory | undefined;
}