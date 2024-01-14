import type { TRPCOptions } from '@/base/types';
import { api, type RouterInputs } from '@/base/utils/server/api';

type AddInstructorToDbData = RouterInputs['db']['instructors']['mutation']['add'];

export const useAddInstructorToDb = (options?: TRPCOptions) => {
  const { onSuccess, onError } = options ?? {};

  const { mutate, isLoading, error } = api.db.instructors.mutation.add.useMutation({
    ...(onSuccess ? { onSuccess } : {}),
    ...(onError ? { onError } : {}),
  });

  return {
    addInstructorToDb: (values: AddInstructorToDbData) => mutate(values),
    isAddingInstructorToDb: isLoading,
    addInstructorToDbError: error,
  };
};
