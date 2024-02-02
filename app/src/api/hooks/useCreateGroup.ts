import { useMutation } from 'react-query';
import { createGroup } from '../services/groupsService';

export const useCreateGroup = (onSuccess?: () => void) => {
  const { mutate, isError, isLoading } = useMutation(createGroup, {
    onSuccess,
  });
  return {
    createGroup: mutate,
    isError,
    isLoading,
  };
};
