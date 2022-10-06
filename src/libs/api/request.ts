import axios from 'axios';
import type { AxiosError, AxiosRequestConfig, AxiosResponse, Method } from 'axios';

import { API_URL } from '@/configs';
import { checkUnauthorized } from '@/libs/local-storage';
import logger from '@/libs/logger';
import { RequireField } from '@/types/common.types';

export const baseURL = API_URL || 'https:localhost:4000/api';

const axiosClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
  timeout: 15000,
  timeoutErrorMessage: '🚧🚧🚧 Server connection time out !',
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',

    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    responseEncoding: 'utf8',
    responseType: 'json',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Access-Control-Allow-Origin': '*',
    'X-Application': 'web app',
    'X-Version': '1.0.1',
  },

  // withCredentials: true, if using cookies
});

interface IOptionsRequest<TDataReq> extends RequireField<AxiosRequestConfig<TDataReq>, 'url'> {
  method: Method;
}

export const request = async <TDataReq = any, TDataRes = any, TDataErr = any>(
  options: IOptionsRequest<TDataReq>
) => {
  // axiosClient.defaults.withCredentials = true;  //if using cookies

  const accessToken = checkUnauthorized();

  if (accessToken) axiosClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

  logger.debug('Axios options', JSON.stringify(options));

  const onSuccess = (response: AxiosResponse<TDataRes>) => {
    logger.debug('Response API:', JSON.stringify(response));

    return {
      ...response.data,
      statusCode: response.status,
    };
  };

  const onError = (error: AxiosError<TDataErr>) => {
    logger.debug('Axios error:', JSON.stringify(error));

    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject({
      ...error.response?.data,
      statusCode: error?.response?.status,
    });
  };

  return axiosClient(options).then(onSuccess).catch(onError);
};
