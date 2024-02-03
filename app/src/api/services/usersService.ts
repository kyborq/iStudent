import { api } from '../api';
import { CreateUser } from '../models/userModel';

export const createPrefectUser = async (user: CreateUser) => {
  await api.post('/users/prefect', user);
};
