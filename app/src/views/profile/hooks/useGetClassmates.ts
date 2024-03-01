import { useQuery } from 'react-query';

import { getUserClassmates } from '../../../api/services/usersService';

export const useGetClassmates = () => {
  const { data } = useQuery(['classmates'], getUserClassmates);
  return data || [];
};
