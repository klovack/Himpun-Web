import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core'
import { createClient, dedupExchange, fetchExchange, Provider } from 'urql'
import { cacheExchange } from '@urql/exchange-graphcache';
import { Navbar } from '../components/Navbar';

import theme from '../theme'
import { loginQueryCacheExchange, registerQueryCacheExchange } from '../util/updateQuery';

const client = createClient({ 
  url: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: "include",
  },
  exchanges: [dedupExchange, cacheExchange({
    updates: {
      Mutation: {
        login: loginQueryCacheExchange,
        register: registerQueryCacheExchange,
      }
    }
  }), fetchExchange]
});

function MyApp({ Component, pageProps }: any) {
  return (
    <Provider value={client}>
      <ThemeProvider theme={theme}>
        <ColorModeProvider>
          <CSSReset />
          <Navbar></Navbar>
          <Component {...pageProps} />
        </ColorModeProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp
