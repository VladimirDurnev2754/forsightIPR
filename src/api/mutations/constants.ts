import { API_URL } from '../constants';
import { ECategory } from '../types';

export const productsUrl = `${API_URL}${ECategory.Products}/`;
export const favoriteUrl = `${API_URL}${ECategory.Favorite}/`;
export const cartUrl = `${API_URL}${ECategory.Cart}/`;

export const categoryUrls: Record<ECategory, string> = {
  [ECategory.Products]: productsUrl,
  [ECategory.Favorite]: favoriteUrl,
  [ECategory.Cart]: cartUrl,
};
