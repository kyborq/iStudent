import { useSetAtom } from 'jotai';
import { useQuery } from 'react-query';

import { authAtom } from '../../atoms/authAtom';
import { currentUser } from '../services/authService';

export const useAuth = () => {
  const setAuthState = useSetAtom(authAtom);

  const { data } = useQuery('auth', currentUser, {
    onError: err => {
      setAuthState(null);
    },
    onSuccess: data => {
      setAuthState(data);
    },
  });

  return data;
};
