import { useMutation, useQueryClient } from 'react-query';

import { ApiError } from '../../../api/error';
import { registerPrefect } from '../../../api/services/authService';
import { saveTokens } from '../../../api/services/keychainService';

export const useRegisterPrefect = () => {
  const queryClient = useQueryClient();

  const { mutate, error } = useMutation(registerPrefect, {
    onSuccess: async tokens => {
      queryClient.invalidateQueries(['auth']);

      if (tokens) {
        await saveTokens(tokens);
      }
    },
    onError: () => {},
  });

  return {
    registerPrefect: mutate,
    error: error as ApiError,
  };
};
