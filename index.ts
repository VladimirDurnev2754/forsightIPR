import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import axios from 'axios';

enum ECategory {
  Favorite = 'favorite',
  Products = 'products',
  Cart = 'cart',
}

const typeDefs = `#graphql
  type Product {
    id: ID!
    title: String!
    price: Int!
    imageUrl: String!
    isFavorite: Boolean!
    isAdded: Boolean!
  }

  type Query {
    products(
      category: String
      search: String
      sortPrice: String
    ): [Product!]!
  }
`;

const resolvers = {
    Query: {
        products: async (_, { category, sortPrice, search }) => {
            const { data } = await axios.get('https://7407a6ddac9521b2.mokky.dev/products', {
                params: {
                    sortBy: sortPrice || undefined,
                    title: search ? `*${search}` : undefined,
                    isFavorite: category === ECategory.Favorite || undefined,

                },
            });

            return data;
        }

    }
};

const server = new ApolloServer({ typeDefs, resolvers });

async function start() {
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
    });
    console.log(`🚀 GraphQL прокси: ${url}`);
    console.log(`📡 Источник: https://7407a6ddac9521b2.mokky.dev/products`);
}

start();