import { ECategory } from './types';

export const API_URL = 'https://7407a6ddac9521b2.mokky.dev/';
export const APOLLO_URL = '/api';

export const productsUrl = `${API_URL}${ECategory.Products}/`;
export const favoriteUrl = `${API_URL}${ECategory.Favorite}/`;
export const cartUrl = `${API_URL}${ECategory.Cart}/`;

export const categoryUrls: Record<ECategory, string> = {
  [ECategory.Products]: productsUrl,
  [ECategory.Favorite]: favoriteUrl,
  [ECategory.Cart]: cartUrl,
};
