import { z } from 'zod';

import { isDigits } from '@/base/utils/client/is-digits';

export const paymentFormSchema = z.object({
  sum: z.string().refine(isDigits),
  comment: z.string(),
  date: z.date().default(() => new Date()),
  licenseFileId: z.number().min(1).optional(),
});

export const paymentBackendInputSchema = z.object({
  ...paymentFormSchema.shape,
  sum: z.number().min(1),
});

export type PaymentFormValues = z.infer<typeof paymentFormSchema>;

export type PaymentBackendInput = z.infer<typeof paymentBackendInputSchema>;
