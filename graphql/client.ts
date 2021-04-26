import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const getUserToken = () => {
  const userData = localStorage.getItem("lu");

  return userData ? JSON.parse(userData)?.token : null;
};

const authLink = setContext((_, { headers }) => {
  const token = getUserToken();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([authLink, httpLink]),
});
