export type TMode = 'production' | 'development';

export const MODE = process.env.NODE_ENV as TMode;

export const isProduction = MODE === 'production';

export const isDevelopment = MODE === 'development';

export const isClient = typeof window !== 'undefined';

export const { API_URL } = process.env;

// replace empty string with link app deployment
export const BASE_URL = MODE === 'development' ? 'http://localhost:6800' : '';
