import { useMutation, useQueryClient } from 'react-query';

import { ApiError } from '../../../api/error';
import { loginUser } from '../../../api/services/authService';
import { saveTokens } from '../../../api/services/keychainService';

export const useLogin = () => {
  const queryClient = useQueryClient();

  const { mutate, error } = useMutation(loginUser, {
    onSuccess: async tokens => {
      queryClient.invalidateQueries(['auth']);

      if (tokens) {
        await saveTokens(tokens);
      }
    },
    onError: () => {},
  });

  return {
    loginUser: mutate,
    error: error as ApiError,
  };
};
