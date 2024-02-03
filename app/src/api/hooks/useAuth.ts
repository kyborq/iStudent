import { useQuery } from 'react-query';
import { currentUser } from '../services/authService';

export const useAuth = () => {
  const { data } = useQuery('auth', currentUser, {
    onError: err => {},
    onSuccess: () => {},
  });

  return data;
};
