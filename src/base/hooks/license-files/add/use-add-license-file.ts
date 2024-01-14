import { api } from '@/base/utils/server/api';
import type { TRPCOptions } from '@/base/types';
import type { LicenseFileFormValues } from '@/base/schemas/license-file-form-schema';

export const useAddLicenseFile = (options?: TRPCOptions) => {
  const { onSuccess, onError } = options ?? {};

  const { mutate, isLoading, error } = api.db.licenseFiles.mutation.add.useMutation({
    ...(onSuccess ? { onSuccess } : {}),
    ...(onError ? { onError } : {}),
  });

  return {
    addLicenseFile: (values: LicenseFileFormValues) =>
      mutate({
        ...values,
        studentId: Number(values.studentId),
        instructorId: Number(values.instructorId),
        price: Number(values.price),
      }),
    isAdding: isLoading,
    additionError: error,
  };
};
