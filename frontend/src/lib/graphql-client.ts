import { GraphQLClient } from 'graphql-request';

// NEXT_PUBLIC_ prefix'i olmadan client-side'da erişilemiyor
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/graphql';

export const graphqlClient = new GraphQLClient(API_URL);
