import { api } from '@/base/utils/server/api';
import type { TRPCOptions } from '@/base/types';

export const useDeleteExpense = (expenseId: number, options?: TRPCOptions) => {
  const { onSuccess, onError } = options ?? {};

  const { mutate, isLoading } = api.db.expenses.mutation.delete.useMutation({
    ...(onSuccess ? { onSuccess } : {}),
    ...(onError ? { onError } : {}),
  });

  return {
    deleteExpense: () => mutate({ expenseId }),
    isDeletingExpense: isLoading,
  };
};
