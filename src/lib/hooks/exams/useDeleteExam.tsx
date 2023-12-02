import { api } from "@/utils/api";
import type { TRPCOptions } from "@/types";

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
