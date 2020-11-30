import { dedupExchange, Exchange, fetchExchange, stringifyVariables } from "urql";
import { cacheExchange, Resolver } from '@urql/exchange-graphcache';
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

const cursorPagination = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;
    const allFields = cache.inspectFields(entityKey);

    const fieldInfos = allFields.filter(info => info.fieldName === fieldName);
    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }

    console.log(fieldArgs);

    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`
    const isInCache = cache.resolveFieldByKey(entityKey, fieldKey);
    info.partial = !isInCache;
    
    const results: string[] = [];
    fieldInfos.forEach(fi => {
      const data = cache.resolveFieldByKey(entityKey, fi.fieldKey) as string[];
      results.push(...data);
    });

    return results;

    // const visited = new Set();
    // let result: NullArray<string> = [];
    // let prevOffset: number | null = null;

    // for (let i = 0; i < size; i++) {
    //   const { fieldKey, arguments: args } = fieldInfos[i];
    //   if (args === null || !compareArgs(fieldArgs, args)) {
    //     continue;
    //   }

    //   const links = cache.resolveFieldByKey(entityKey, fieldKey) as string[];
    //   const currentOffset = args[offsetArgument];

    //   if (
    //     links === null ||
    //     links.length === 0 ||
    //     typeof currentOffset !== 'number'
    //   ) {
    //     continue;
    //   }

    //   const tempResult: NullArray<string> = [];

    //   for (let j = 0; j < links.length; j++) {
    //     const link = links[j];
    //     if (visited.has(link)) continue;
    //     tempResult.push(link);
    //     visited.add(link);
    //   }

    //   if (
    //     (!prevOffset || currentOffset > prevOffset) ===
    //     (mergeMode === 'after')
    //   ) {
    //     result = [...result, ...tempResult];
    //   } else {
    //     result = [...tempResult, ...result];
    //   }

    //   prevOffset = currentOffset;
    // }

    // const hasCurrentPage = cache.resolve(entityKey, fieldName, fieldArgs);
    // if (hasCurrentPage) {
    //   return result;
    // } else if (!(info as any).store.schema) {
    //   return undefined;
    // } else {
    //   info.partial = true;
    //   return result;
    // }
  };
};


export const createUrqlClient = (ssrExchange: any) => ({
  url: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: "include" as const,
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      resolvers: {
        Query: {
          posts: cursorPagination(),
        }
      },
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