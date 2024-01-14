import { api } from '@/base/utils/server/api';
import type { TRPCOptions } from '@/base/types';
import type { PaymentFormValues } from '@/base/schemas/payment-form.schema';

export const useAddPayment = (options?: TRPCOptions) => {
  const { onSuccess, onError } = options ?? {};

  const { mutate, isLoading, error } = api.db.payments.mutation.add.useMutation({
    ...(onSuccess ? { onSuccess } : {}),
    ...(onError ? { onError } : {}),
  });

  return {
    addPayment: (values: PaymentFormValues) => mutate({ ...values, sum: Number(values.sum) || 0 }),
    isAdding: isLoading,
    additionError: error,
  };
};
