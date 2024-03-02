import { useMutation, useQueryClient } from 'react-query';

import { createSubject } from '../../../api/services/subjectsService';

export const useCreateSubject = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(createSubject, {
    onSuccess: () => {
      queryClient.invalidateQueries(['subjects']);
    },
  });

  return mutate;
};
