import { useMutation, useQueryClient } from 'react-query';

import { ApiError } from '../../../api/error';
import { registerStudent } from '../../../api/services/authService';
import { saveTokens } from '../../../api/services/keychainService';

export const useRegister = () => {
  const queryClient = useQueryClient();

  const { mutate, error } = useMutation(registerStudent, {
    onSuccess: async tokens => {
      queryClient.invalidateQueries(['auth']);

      if (tokens) {
        await saveTokens(tokens);
      }
    },
    onError: () => {},
  });

  return {
    registerStudent: mutate,
    error: error as ApiError,
  };
};
