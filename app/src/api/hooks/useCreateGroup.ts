import { useMutation } from 'react-query';
import { createGroup } from '../services/groupsService';

export const useCreateGroup = () => {
  const { mutate, isError, isLoading } = useMutation(createGroup);
  return {
    createGroup: mutate,
    isError,
    isLoading,
  };
};
