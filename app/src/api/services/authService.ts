import axios from 'axios';

import { api } from '../api';
import { ApiError } from '../error';
import { Credentials } from '../models/authModel';

export const loginUser = async (credentials: Credentials) => {
  try {
    await api.post('/auth/login', credentials);
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      const error = err.response.data;
      throw error as ApiError;
    }
  }
};

export const currentUser = async () => {
  try {
    return await api.get('/auth/current');
  } catch (err) {
    throw err;
  }
};

export const logoutUser = async () => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    console.error('Logout failed', error);
  }
};
