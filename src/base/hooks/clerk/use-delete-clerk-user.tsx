import { api } from '@/base/utils/server/api';
import type { TRPCOptions } from '@/base/types';

export const useDeleteClerkUser = (options?: TRPCOptions) => {
  const { onSuccess, onError } = options ?? {};

  const {
    mutate,
    isLoading: isDeleting,
    error: deletionError,
  } = api.clerk.users.mutation.delete.useMutation({
    ...(onSuccess ? { onSuccess } : {}),
    ...(onError ? { onError } : {}),
  });

  return {
    deleteClerkUser: (clerkUserId: string) => mutate({ clerkUserId }),
    isDeleting,
    deletionError,
  };
};
