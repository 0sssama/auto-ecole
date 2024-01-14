import type { SchoolSettingsFormValues } from '@/base/schemas/school-settings-form-schema';
import type { TRPCOptions } from '@/base/types';
import { api } from '@/base/utils/server/api';

export const useUpdateSchool = (options?: TRPCOptions) => {
  const { onSuccess, onError } = options ?? {};

  const { mutate, isLoading, error } = api.db.school.mutation.update.useMutation({
    ...(onSuccess ? { onSuccess } : {}),
    ...(onError ? { onError } : {}),
  });

  return {
    updateSchool: (data: SchoolSettingsFormValues) => mutate(data),
    isUpdating: isLoading,
    updateError: error,
  };
};
