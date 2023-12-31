import { z } from 'zod';

import { isDigits } from '@/base/utils/client/is-digits';

export const expenseFormSchema = z.object({
  sum: z.string().refine(isDigits),
  comment: z.string(),
  date: z.date().default(() => new Date()),
});

export const expenseBackendSchema = z.object({
  ...expenseFormSchema.shape,
  sum: z.number().min(1),
});
