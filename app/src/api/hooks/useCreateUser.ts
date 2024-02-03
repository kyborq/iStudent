import { useMutation } from 'react-query';
import { createPrefectUser } from '../services/usersService';

export const useCreateUser = () => {
  const { mutate: createPrefect } = useMutation(createPrefectUser);

  return {
    createPrefect,
  };
};
