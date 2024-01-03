import type { TRPCOptions } from '@/base/types';

import { useDeleteStudentFromClerk } from './use-delete-student-from-clerk';
import { useDeleteStudentFromDb } from './use-delete-student-from-db';

export const useDeleteStudent = (studentId: number, options?: TRPCOptions) => {
  const { onSuccess, onError } = options ?? {};

  const {
    deleteStudent: deleteStudentFromClerk,
    isDeleting: isDeletingStudentFromClerk,
    deletionError: clerkDeletionError,
  } = useDeleteStudentFromClerk({
    ...(onSuccess ? { onSuccess } : {}),
    ...(onError ? { onError } : {}),
  });

  const {
    deleteStudent: deleteStudentFromDb,
    isDeleting: isDeletingStudentFromDb,
    deletionError: dbDeletionError,
  } = useDeleteStudentFromDb(studentId, {
    onSuccess: (data) => {
      deleteStudentFromClerk(data);
    },
    ...(onError ? { onError } : {}),
  });

  return {
    deleteStudent: () => deleteStudentFromDb(),
    isLoading: isDeletingStudentFromClerk || isDeletingStudentFromDb,
    error: clerkDeletionError || dbDeletionError,
  };
};
