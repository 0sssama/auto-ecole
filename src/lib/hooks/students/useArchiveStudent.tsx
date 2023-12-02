import { api } from "@/utils/api";
import type { TRPCOptions } from "@/types";

export const useArchiveStudent = (studentId: number, options?: TRPCOptions) => {
  const { onSuccess, onError } = options ?? {};

  const { mutate, isLoading } = api.db.students.mutation.archive.useMutation({
    ...(onSuccess ? { onSuccess } : {}),
    ...(onError ? { onError } : {}),
  });

  return {
    archiveStudent: () => mutate({ studentId }),
    isArchivingStudent: isLoading,
  };
};

export const useUnarchiveStudent = (
  studentId: number,
  options?: TRPCOptions,
) => {
  const { onSuccess, onError } = options ?? {};

  const { mutate, isLoading } = api.db.students.mutation.dearchive.useMutation({
    ...(onSuccess ? { onSuccess } : {}),
    ...(onError ? { onError } : {}),
  });

  return {
    unarchiveStudent: () => mutate({ studentId }),
    isUnarchivingStudent: isLoading,
  };
};
