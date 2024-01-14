import { z } from 'zod';

import { isDigits } from '@/base/utils/client/is-digits';

export const licenseFileExpenseFormSchema = z.object({
  sum: z.string().refine(isDigits),
  comment: z.string(),
  date: z.date().default(() => new Date()),
  licenseFileId: z.number().min(1),
});

export const licenseFileExpenseBackendSchema = z.object({
  ...licenseFileExpenseFormSchema.shape,
  sum: z.number().min(1),
});
