import { z } from 'zod';

import { isDigits } from '@/base/utils/client/is-digits';

export const expenseFormSchema = z.object({
  sum: z.string().refine(isDigits),
  comment: z.string(),
  date: z.date().default(() => new Date()),
  licenseFileId: z.number().optional(),
  vehicleId: z.number().optional(),
});

export const expenseBackendSchema = z.object({
  ...expenseFormSchema.shape,
  sum: z.number().min(1),
});

export type ExpenseFormValues = z.infer<typeof expenseFormSchema>;

export type ExpenseBackendInput = z.infer<typeof expenseBackendSchema>;
