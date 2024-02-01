import axios from 'axios';

export const BASE_URL = 'http://10.0.2.2:3000';
// export const BASE_URL = 'http://127.0.0.1:3000';

export const api = axios.create({
  baseURL: BASE_URL,
});
