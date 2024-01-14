import { api } from '@/base/utils/server/api';
import type { TRPCOptions } from '@/base/types';

export const useDeleteExam = (examId: number, options?: TRPCOptions) => {
  const { onSuccess, onError } = options ?? {};

  const { mutate, isLoading } = api.db.exams.mutation.delete.useMutation({
    ...(onSuccess ? { onSuccess } : {}),
    ...(onError ? { onError } : {}),
  });

  return {
    deleteExam: () => mutate({ examId }),
    isDeletingExam: isLoading,
  };
};
