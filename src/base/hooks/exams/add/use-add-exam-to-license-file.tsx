import { api } from '@/base/utils/server/api';
import type { TRPCOptions } from '@/base/types';
import type { ExamFormValues } from '@/components/molecules/modal/exams/add/add.types';

export const useAddExamToLicenseFile = (licenseFileId: number, options?: TRPCOptions) => {
  const { onSuccess, onError } = options ?? {};

  const { mutate, isLoading, error } = api.db.exams.mutation.addToLicenseFile.useMutation({
    ...(onSuccess ? { onSuccess } : {}),
    ...(onError ? { onError } : {}),
  });

  return {
    addExamToLicenseFile: (values: ExamFormValues) => mutate({ ...values, licenseFileId }),
    isAddingExamToLicenseFile: isLoading,
    addExamToLicenseFileError: error,
  };
};
