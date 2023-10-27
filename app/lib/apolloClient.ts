"use client";
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  SuspenseCache,
} from "@apollo/client";
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { setContext } from '@apollo/client/link/context';

const authLink = setContext((_, { context }) => {
  return {
    headers: {
      ...context,     
      'x-hasura-admin-secret': process.env.X_HASURA_ADMIN_SECRET,   
    },
  };
});


function makeClient() {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL,
  });

  return new ApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: authLink.concat(httpLink),
  });
}

function makeSuspenseCache() {
  return new SuspenseCache();
}

export function initializeApollo({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider
      makeClient={makeClient}
      makeSuspenseCache={makeSuspenseCache}
    >
      {children}
    </ApolloNextAppProvider>
  );
}

