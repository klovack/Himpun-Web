import { ColorModeProvider, CSSReset, ThemeProvider } from '@chakra-ui/core';
import 'react-quill/dist/quill.bubble.css';

import theme from '../theme';
import '../styles/styles.scss';

function MyApp({ Component, pageProps }: any) {
  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <CSSReset />
        <Component {...pageProps} />
      </ColorModeProvider>
    </ThemeProvider>
  );
}

export default MyApp;
