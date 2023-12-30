import { api } from '@/base/utils/server/api';
import type { TRPCOptions } from '@/base/types';

export const useDeleteStudentFromDb = (studentId: number, options?: TRPCOptions) => {
  const { onSuccess, onError } = options ?? {};

  const {
    mutate,
    isLoading: isDeleting,
    error: deletionError,
  } = api.db.students.mutation.delete.useMutation({
    ...(onSuccess ? { onSuccess } : {}),
    ...(onError ? { onError } : {}),
  });

  return {
    deleteStudent: () => mutate({ studentId }),
    isDeleting,
    deletionError,
  };
};
