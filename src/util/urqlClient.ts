import { dedupExchange, Exchange, fetchExchange } from "urql";
import { cacheExchange } from '@urql/exchange-graphcache';
import { logoutQueryCacheExchange, loginQueryCacheExchange, registerQueryCacheExchange } from "./updateQuery";
import { pipe, tap } from "wonka";
import Router from "next/router";


const errorExchange: Exchange = ({forward}) => (ops$) => {
  return pipe(
    forward(ops$),
    tap(({ error }) => {
      if (error?.message.includes("not authenticated")) {
        const graphqlError = error?.graphQLErrors.length > 0 ? error.graphQLErrors[0] : null;
        const redirectPath = graphqlError?.path && graphqlError.path.length > 0 ? graphqlError.path[0].toString : ""; 
        Router.replace(`/login?redirect=${redirectPath}`);
      }
    })
  );
};

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
    errorExchange,
    fetchExchange,
  ]
});