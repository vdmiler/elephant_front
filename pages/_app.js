import Head from "next/head";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, theme } from "../globalStyle";
import "../style.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Elephant Parade</title>
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
