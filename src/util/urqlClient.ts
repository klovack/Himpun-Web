import { dedupExchange, fetchExchange } from "urql";
import { cacheExchange } from '@urql/exchange-graphcache';
import { logoutQueryCacheExchange, loginQueryCacheExchange, registerQueryCacheExchange } from "./updateQuery";

export const createUrqlClient = (ssrExchange: any) => ({
  url: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: "include" as const,
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          logout: logoutQueryCacheExchange,
          login: loginQueryCacheExchange,
          register: registerQueryCacheExchange,
        }
      }
    }),
    ssrExchange,
    fetchExchange]
});