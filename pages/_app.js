import { useEffect } from "react";
import { Provider, useSelector } from "react-redux";
import { useRouter } from "next/router";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { StylesProvider, ThemeProvider } from "@material-ui/core/styles";
import { ApolloProvider } from "@apollo/client";
import "../styles/globals.css";

import { client } from "../graphql/client";
import store, { selectUser } from "../store";
import { theme } from "../styles/theme";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <StylesProvider injectFirst>
          <ThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Wrapper>
                <Component {...pageProps} />
              </Wrapper>
            </MuiPickersUtilsProvider>
          </ThemeProvider>
        </StylesProvider>
      </Provider>
    </ApolloProvider>
  );
}

const whitelistedPaths = ["/login", "/_error"];

function Wrapper(props) {
  const user = useSelector(selectUser);
  const router = useRouter();
  const { pathname } = router;

  useEffect(() => {
    if (!user && pathname !== "/login") {
      router.replace(`/login?next=${pathname}`);
    }
  }, [user, pathname]);

  if (!user && !whitelistedPaths.includes(pathname)) {
    return null;
  }

  return props.children;
}

export default MyApp;
