import { api } from '@/base/utils/server/api';
import type { TRPCOptions } from '@/base/types';
import type { LessonFormValues } from '@/base/schemas/lesson-form.schema';

export const useAddLesson = (licenseFileId: number | undefined, options?: TRPCOptions) => {
  const { onSuccess, onError } = options ?? {};

  const { mutate, isLoading, error } = api.db.lessons.mutation.add.useMutation({
    ...(onSuccess ? { onSuccess } : {}),
    ...(onError ? { onError } : {}),
  });

  return {
    addLesson: (values: LessonFormValues) =>
      mutate({
        ...values,
        licenseFileId,
        studentId: Number(values.studentId),
        instructorId: Number(values.instructorId),
        price: Number(values.price),
        duration: Number(values.duration),
      }),
    isAdding: isLoading,
    additionError: error,
  };
};
