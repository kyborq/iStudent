import { api } from '../api';
import { CreateUser, User } from '../models/userModel';

export const createPrefectUser = async (user: CreateUser) => {
  await api.post('/users/prefect', user);
};

export const getUserClassmates = async () => {
  const { data: classmates } = await api.get<User[]>('/users');
  return classmates;
};
