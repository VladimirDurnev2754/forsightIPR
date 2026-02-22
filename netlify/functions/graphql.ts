import { ApolloServer } from '@apollo/server';
import { startServerAndCreateLambdaHandler, handlers } from '@as-integrations/aws-lambda';
import axios from 'axios';
import { productsUrl } from '../../src/api/mutations/constants';
import { ECategory } from '../../src/api/types';

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
export const handler = startServerAndCreateLambdaHandler(
  server,
  // Меняем V2 на V1 — это более стандартный формат для Netlify CLI
  handlers.createAPIGatewayProxyEventRequestHandler()
);
