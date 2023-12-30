import type { TRPCOptions } from '@/base/types';
import { api, type RouterInputs } from '@/base/utils/server/api';

export const useAddStudentToDb = (options?: TRPCOptions) => {
  const { onSuccess, onError } = options ?? {};

  const {
    mutate,
    isLoading: isAdding,
    error: additionError,
  } = api.db.students.mutation.add.useMutation({
    ...(onSuccess ? { onSuccess } : {}),
    ...(onError ? { onError } : {}),
  });

  return {
    addStudentToDb: (values: RouterInputs['db']['students']['mutation']['add']) => mutate(values),
    isAdding,
    additionError,
  };
};
