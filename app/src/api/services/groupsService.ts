import { api } from '../api';

export const createGroup = async () => {
  await api.post('/groups');
};
