import '@/styles/globals.css';
import '@/styles/testCSS.css';
import '@/styles/slide-left.css';
import type { AppProps } from 'next/app';
import 'swiper/css';
import { Sarabun } from 'next/font/google';
import { QueryClientProvider, QueryClient } from 'react-query';
import React from 'react';
import { appWithTranslation } from 'next-i18next';

const sarabun = Sarabun({ weight: '400', subsets: ['latin'] });

const App = ({ Component, pageProps }: AppProps) => {
    const [queryClient] = React.useState(() => new QueryClient());
    return (
        <main className={sarabun.className}>
            <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
            </QueryClientProvider>
        </main>
    );
};

export default appWithTranslation(App);
