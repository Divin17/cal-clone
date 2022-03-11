import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const client = new QueryClient();
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
