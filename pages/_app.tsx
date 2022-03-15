import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import "../styles/globals.css";
import client from "./react-query-client.ts";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <QueryClientProvider client={client}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
        <ReactQueryDevtools />
      </SessionProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
