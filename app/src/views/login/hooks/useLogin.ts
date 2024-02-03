import { useMutation, useQueryClient } from 'react-query';
import { loginUser } from '../../../api/services/authService';
import { ApiError } from '../../../api/error';

export const useLogin = () => {
  const queryClient = useQueryClient();

  const { mutate, error } = useMutation(loginUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['auth']);
    },
  });

  return {
    loginUser: mutate,
    error: error as ApiError,
  };
};
