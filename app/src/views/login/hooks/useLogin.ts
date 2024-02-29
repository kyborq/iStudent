import { useSetAtom } from 'jotai';
import { useMutation, useQueryClient } from 'react-query';

import { ApiError } from '../../../api/error';
import { loginUser } from '../../../api/services/authService';
import { saveTokens } from '../../../api/services/keychainService';
import { authAtom } from '../../../atoms/authAtom';

export const useLogin = () => {
  const queryClient = useQueryClient();

  const { mutate, error } = useMutation(loginUser, {
    onSuccess: async tokens => {
      queryClient.invalidateQueries(['auth']);

      if (tokens) {
        // setAuthState({
        //   accessToken: tokens.accessToken,
        //   refreshToken: tokens.refreshToken,
        //   isAuth: true,
        // });
        await saveTokens(tokens);
      }
    },
    onError: () => {
      // setAuthState({
      //   accessToken: null,
      //   refreshToken: null,
      //   isAuth: true,
      // });
    },
  });

  return {
    loginUser: mutate,
    error: error as ApiError,
  };
};
