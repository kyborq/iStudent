import { api } from '../api';
import { CreateGroup } from '../models/groupModel';

export const createGroup = async (group: CreateGroup) => {
  await api.post('/groups', group);
};
