import { ComponentType, ReactElement, useState } from 'react';

import type { NextPage } from 'next';

import { Hydrate, QueryClient, QueryClientProvider, DehydratedState } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';

import '@/styles/globals.scss';
import { queryClientOptions } from '@/libs/react-query';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactElement;
};

interface DehydratedStateProps {
  dehydratedState: DehydratedState;
}

interface AppPropsWithLayout extends AppProps<DehydratedStateProps> {
  Component: NextPageWithLayout;
}

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const { dehydratedState, ...restPageProps } = pageProps;

  const [queryClient] = useState(() => new QueryClient(queryClientOptions));

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={dehydratedState}>{getLayout(<Component {...restPageProps} />)}</Hydrate>
      <ReactQueryDevtools
        initialIsOpen={false}
        panelProps={{ style: { minHeight: 250 } }}
        position="bottom-right"
      />
    </QueryClientProvider>
  );
};

export default appWithTranslation(MyApp as ComponentType<any>);
