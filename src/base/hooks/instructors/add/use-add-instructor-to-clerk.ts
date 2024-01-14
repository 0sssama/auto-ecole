import type { TRPCOptions } from '@/base/types';
import { api, type RouterInputs } from '@/base/utils/server/api';

type AddInstructorToClerkData = RouterInputs['clerk']['users']['mutation']['addInstructor'];

export const useAddInstructorToClerk = (options?: TRPCOptions) => {
  const { onSuccess, onError } = options ?? {};

  const { mutate, isLoading, error } = api.clerk.users.mutation.addInstructor.useMutation({
    ...(onSuccess ? { onSuccess } : {}),
    ...(onError ? { onError } : {}),
  });

  return {
    addInstructorToClerk: (values: AddInstructorToClerkData) => mutate(values),
    isAddingInstructorToClerk: isLoading,
    addInstructorToClerkError: error,
  };
};
