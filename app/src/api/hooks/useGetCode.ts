import {useMutation, useQuery} from 'react-query';
import {getCode} from '../services/codeService';

export const useGetCode = () => {
  const {data, mutate, isError} = useMutation((clientId: string) => getCode(clientId));

  return {
    code: data,
    getCode: mutate,
    isError,
  };
};
