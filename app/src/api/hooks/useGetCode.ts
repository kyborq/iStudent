import { useMutation, useQuery } from 'react-query';
import { getQrCode } from '../services/codesService';

export const useGetCode = () => {
  const { data, mutate, isError } = useMutation((clientId: string) =>
    getQrCode(clientId),
  );

  return {
    code: data,
    getCode: mutate,
    isError,
  };
};
