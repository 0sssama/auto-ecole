import { z } from 'zod';

export type LicenseFileExpense = {
  id: number;
  sum: number;
  comment: string;
  adminName: string;
  date: Date;
};

export const licenseFileExpenseSchema: z.ZodType<LicenseFileExpense> = z.object({
  id: z.number(),
  sum: z.number(),
  comment: z.string(),
  adminName: z.string(),
  date: z.date(),
});
