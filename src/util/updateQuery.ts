import { Cache, QueryInput } from '@urql/exchange-graphcache';
import { LoginMutation, MeDocument, MeQuery, RegisterMutation } from '../generated/graphql';

export function typedUpdateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query
) {
  return cache.updateQuery(qi, data => fn(result, data as any) as any);
}

export const loginQueryCacheExchange = (_result: any, __:any , cache: any, _: any) => {
  typedUpdateQuery<LoginMutation, MeQuery>(
    cache, 
    {query: MeDocument},
    _result,
    (result, query) => {
      if (result.login.errors) {
        return query;
      }

      return {
        profile: result.login.user,
      };
    }
  );
}

export const registerQueryCacheExchange = (_result: any, __:any , cache: any, _: any) => {
  typedUpdateQuery<RegisterMutation, MeQuery>(
    cache, 
    {query: MeDocument},
    _result,
    (result, query) => {
      if (result.register.errors) {
        return query;
      }

      return {
        profile: result.register.user,
      };
    }
  );
}