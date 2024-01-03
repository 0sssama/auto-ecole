import type { TRPCOptions } from '@/base/types';
import { api, type RouterInputs } from '@/base/utils/server/api';

export const useAddStudentToClerk = (options?: TRPCOptions) => {
  const { onSuccess, onError } = options ?? {};

  const {
    mutate,
    isLoading: isAdding,
    error: additionError,
  } = api.clerk.users.mutation.add.useMutation({
    ...(onSuccess ? { onSuccess } : {}),
    ...(onError ? { onError } : {}),
  });

  return {
    addStudentToClerk: (values: RouterInputs['clerk']['users']['mutation']['add']) => mutate(values),
    isAdding,
    additionError,
  };
};
