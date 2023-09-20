import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "swiper/css";
import { Kanit } from "next/font/google";
import { QueryClientProvider, QueryClient } from "react-query";
import React from "react";
const kanit = Kanit({ weight: "400", subsets: ["latin"] });
export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <main className={kanit.className}>
              <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
    </main>
    
  );
}
