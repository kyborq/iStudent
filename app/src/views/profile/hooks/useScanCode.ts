import { useMutation, useQueryClient } from 'react-query';

import { saveQrCode } from '../../../api/services/codesService';

export const useScanCode = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(saveQrCode, {
    onSuccess: () => {
      queryClient.invalidateQueries(['classmates']);
    },
  });

  return mutate;
};
