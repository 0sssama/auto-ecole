import { TRPCOptions } from "@/types";
import { api } from "@/utils/api";

export const useDeleteClient = (clientId: number, options?: TRPCOptions) => {
  const { onSuccess, onError } = options ?? {};

  const {
    mutate: deleteClientFromClerk,
    isLoading: isDeletingClientFromClerk,
  } = api.clerk.users.mutation.delete.useMutation({
    ...(onSuccess ? { onSuccess } : {}),
    ...(onError ? { onError } : {}),
  });

  const { mutate: deleteClientFromDb, isLoading: isDeletingClientFromDb } =
    api.db.customers.mutation.delete.useMutation({
      onSuccess: (data) => {
        deleteClientFromClerk(data);
      },
      ...(onError ? { onError } : {}),
    });

  return {
    deleteClient: () => deleteClientFromDb({ clientId }),
    isLoading: isDeletingClientFromClerk || isDeletingClientFromDb,
  };
};
