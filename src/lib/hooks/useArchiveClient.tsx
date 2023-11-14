import { TRPCOptions } from "@/types";
import { api } from "@/utils/api";

export const useArchiveClient = (clientId: number, options?: TRPCOptions) => {
  const { onSuccess, onError } = options ?? {};

  const { mutate, isLoading } = api.db.customers.mutation.archive.useMutation({
    ...(onSuccess ? { onSuccess } : {}),
    ...(onError ? { onError } : {}),
  });

  return {
    archiveClient: () => mutate({ clientId }),
    isArchivingClient: isLoading,
  };
};

export const useUnarchiveClient = (clientId: number, options?: TRPCOptions) => {
  const { onSuccess, onError } = options ?? {};

  const { mutate, isLoading } = api.db.customers.mutation.dearchive.useMutation(
    {
      ...(onSuccess ? { onSuccess } : {}),
      ...(onError ? { onError } : {}),
    },
  );

  return {
    unarchiveClient: () => mutate({ clientId }),
    isUnarchivingClient: isLoading,
  };
};
