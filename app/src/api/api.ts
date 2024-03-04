import axios from 'axios';

import { getTokens } from './services/keychainService';

export const BASE_URL = 'http://192.168.218.210:3000';

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  async config => {
    // TODO: What about tokens expiration?
    const tokens = await getTokens();

    if (tokens) {
      const cookieString = `jwt=${tokens.accessToken}; refreshToken=${tokens.refreshToken}; Path=/; Secure; HttpOnly;`;
      config.headers['Cookie'] = cookieString;
    }

    return config;
  },
  error => {
    // TODO: Refresh auth tokens
    return Promise.reject(error);
  },
);
