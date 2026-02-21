import { productsUrl } from '@/api/mutatuons/constants';
import { ECategory } from '@/api/types';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import axios from 'axios';

const typeDefs = `#graphql
  type Product {
    id: ID!
    title: String!
    price: Int!
    imageUrl: String!
    isFavorite: Boolean!
    isAdded: Boolean!
  }

  input ProductInput {
    id: ID
    title: String
    price: Int
    imageUrl: String
    isFavorite: Boolean
    isAdded: Boolean
    }

  type Query {
    products(
      category: String
      search: String
      sortPrice: String
    ): [Product!]!
  }

  type Mutation {
    updateProduct(url: String, updateItem: ProductInput): Product!
  }
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

const server = new ApolloServer({ typeDefs, resolvers });

async function start() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`🚀 GraphQL прокси: ${url}`);
  console.log(`📡 Источник: productsUrl ${productsUrl}`);
}

start();
