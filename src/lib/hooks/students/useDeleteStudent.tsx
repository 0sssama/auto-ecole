import { api } from "@/utils/api";
import type { TRPCOptions } from "@/types";

export const useDeleteStudent = (studentId: number, options?: TRPCOptions) => {
  const { onSuccess, onError } = options ?? {};

  const {
    mutate: deleteStudentFromClerk,
    isLoading: isDeletingStudentFromClerk,
  } = api.clerk.users.mutation.delete.useMutation({
    ...(onSuccess ? { onSuccess } : {}),
    ...(onError ? { onError } : {}),
  });

  const { mutate: deleteStudentFromDb, isLoading: isDeletingStudentFromDb } =
    api.db.students.mutation.delete.useMutation({
      onSuccess: (data) => {
        deleteStudentFromClerk(data);
      },
      ...(onError ? { onError } : {}),
    });

  return {
    deleteStudent: () => deleteStudentFromDb({ studentId }),
    isLoading: isDeletingStudentFromClerk || isDeletingStudentFromDb,
  };
};
