import { api } from '@/base/utils/server/api';
import type { TRPCOptions } from '@/base/types';
import type { ExpenseFormValues } from '@/base/schemas/expense-form.schema';

interface ExpenseContext {
  vehicleId?: number;
  licenseFileId?: number;
}

export const useAddExpense = (context?: ExpenseContext, options?: TRPCOptions) => {
  const { onSuccess, onError } = options ?? {};

  const { mutate, isLoading, error } = api.db.expenses.mutation.add.useMutation({
    ...(onSuccess ? { onSuccess } : {}),
    ...(onError ? { onError } : {}),
  });

  return {
    addExpense: (values: ExpenseFormValues) => mutate({ ...values, ...context, sum: Number(values.sum) || 0 }),
    isAdding: isLoading,
    additionError: error,
  };
};
