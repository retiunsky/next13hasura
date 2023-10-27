import { useEffect, useMemo } from 'react';
import {
  ApolloClient,
  ApolloQueryResult,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  OperationVariables,
  QueryOptions,
} from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities';
import merge from 'deepmerge';
import isEqual from 'lodash/isEqual';
import { getCookies } from './utils/getCookies';
import { getRequestStorage } from './localStorage';
import { setContext } from '@apollo/client/link/context';

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

const authLink = setContext((_, { context }) => {
  return {
    headers: {
      ...context,     
      'x-hasura-admin-secret': process.env.X_HASURA_ADMIN_SECRET,
    },
  };
});

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL,
});

const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            posts: relayStylePagination(),
          },
        },
      },
    }),
  });
};

export const mergeCaches = (
  sourceCache: NormalizedCacheObject,
  destinationCache: NormalizedCacheObject
): NormalizedCacheObject => {
  const data = merge(sourceCache, destinationCache, {
    arrayMerge: (destinationArray, sourceArray) => [
      ...sourceArray,
      ...destinationArray.filter((d) =>
        sourceArray.every((s) => !isEqual(d, s))
      ),
    ],
  });
  return data;
};

export const initializeApollo = (initialState?: NormalizedCacheObject) => {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    const existingCache = _apolloClient.extract();

    const data = mergeCaches(initialState, existingCache);

    _apolloClient.cache.restore(data);
  }

  if (typeof window === 'undefined' && !apolloClient) {
    const originalQuery = _apolloClient.query;   
    return _apolloClient;
  }
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
};

export const useApollo = (state: NormalizedCacheObject) => {
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
};
