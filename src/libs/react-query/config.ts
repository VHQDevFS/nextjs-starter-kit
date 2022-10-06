import { DefaultOptions, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import logger from '@/libs//logger';
import { checkUnauthorized } from '@/libs/local-storage';
import { ExtractFnReturnType } from '@/types/common.types';

export type QueryConfig<QueryFnType extends (...args: any) => any> = Omit<
  UseQueryOptions<ExtractFnReturnType<QueryFnType>>,
  'queryKey' | 'queryFn'
>;

export type MutationConfig<MutationFnType extends (...args: any) => any> = Omit<
  UseMutationOptions<
    ExtractFnReturnType<MutationFnType>,
    AxiosError,
    Parameters<MutationFnType>[0]
  >,
  'mutationFn'
>;

function queryErrorHandler(error: AxiosError): void {
  const accessToken = checkUnauthorized();
  const id = 'react-query-error';
  const titleError =
    error instanceof Error
      ? // remove the initial 'Error: ' that accompanies many errors
        error.toString().replace(/^Error:\s*/, '')
      : 'error connecting to server';
  // if (error?.statusCode === 401 && accessToken) {
  //   void refreshTokenFn();
  // } else {
  //
  // }
  logger.debug('🚀 ~ Query onError:', { id, titleError, accessToken });
}

const defaultOptions: DefaultOptions<AxiosError> = {
  queries: {
    onError: queryErrorHandler,
    staleTime: 600000, // 10 minutes
    cacheTime: 900000, // 15 minutes
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    // retry: 1,
  },
  mutations: {
    onError: queryErrorHandler,
  },
};

export const queryClientOptions = {
  defaultOptions: defaultOptions as DefaultOptions,
};
