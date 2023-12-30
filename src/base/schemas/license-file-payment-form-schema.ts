import { z } from 'zod';

import { isDigits } from '@/base/utils/client/is-digits';

export const licenseFilePaymentFormSchema = z.object({
  licenseFileId: z.number().min(1),
  sum: z.string().refine(isDigits),
  comment: z.string(),
  date: z.date().default(() => new Date()),
});

export const licenseFilePaymentBackendInputSchema = z.object({
  ...licenseFilePaymentFormSchema.shape,
  sum: z.number().min(1),
});
