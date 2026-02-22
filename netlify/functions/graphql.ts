import { ApolloServer } from '@apollo/server';
import { startServerAndCreateLambdaHandler, handlers } from '@as-integrations/aws-lambda';
import axios from 'axios';
// ДУБЛИКАТЫ ИБО НЕТЛИФАЙ НЕ ВИДИТ ИМПОРТЫ
const API_URL = 'https://7407a6ddac9521b2.mokky.dev/';
enum ECategory {
  Favorite = 'favorite',
  Products = 'products',
  Cart = 'cart',
}
const productsUrl = `${API_URL}${ECategory.Products}/`;

const typeDefs = `#graphql
  type Product { id: ID!, title: String, price: Int, imageUrl: String, isFavorite: Boolean, isAdded: Boolean }
  input ProductInput { id: ID, title: String, price: Int, imageUrl: String, isFavorite: Boolean, isAdded: Boolean }
  type Query { products(category: String, search: String, sortPrice: String): [Product!]! }
  type Mutation { updateProduct(url: String, updateItem: ProductInput): Product! }
`;

const resolvers = {
  Query: {
    products: async (_, { category, sortPrice, search }) => {
      const { data } = await axios.get(productsUrl, {
        params: {
          sortBy: sortPrice || undefined,
          title: search ? `*${search}` : undefined,
          isFavorite: category === ECategory.Favorite || undefined,
        },
      });
      return data;
    },
  },
  Mutation: {
    updateProduct: async (_, { url, updateItem }) => {
      const { data } = await axios.patch(url, updateItem);
      return data;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // Добавь это обязательно для локальной работы:
  introspection: true,
});

// Этот хендлер — "родной" для Netlify, он не требует Express
// eslint-disable-next-line import/prefer-default-export
export const handler = startServerAndCreateLambdaHandler(
  server,
  // Меняем V2 на V1 — это более стандартный формат для Netlify CLI
  handlers.createAPIGatewayProxyEventRequestHandler()
);
