import { useQuery } from 'react-query';

import { getSubjects } from '../../../api/services/subjectsService';

export const useSubjects = () => {
  const { data, refetch, isRefetching } = useQuery(['subjects'], getSubjects);

  return {
    subjects: data || [],
    refresh: refetch,
    refreshing: isRefetching,
  };
};
