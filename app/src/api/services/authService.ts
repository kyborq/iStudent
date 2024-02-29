import axios from 'axios';

import { api } from '../api';
import { ApiError } from '../error';
import { Credentials, Tokens } from '../models/authModel';
import { CreateUser, User } from '../models/userModel';

export const loginUser = async (credentials: Credentials) => {
  try {
    const { data: tokens } = await api.post<Tokens>('/auth/login', credentials);
    return tokens;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      const error = err.response.data;
      throw error as ApiError;
    }
  }
};

export const currentUser = async () => {
  try {
    const { data: user } = await api.get<User>('/auth/current');
    return user;
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

export const registerStudent = async (user: CreateUser) => {
  try {
    const { data: tokens } = await api.post<Tokens>('/auth/student', user);
    return tokens;
  } catch (error) {
    console.error('Logout failed', error);
  }
};
