import { z } from 'zod';

export type Expense = {
  id: number;
  sum: number;
  comment: string;
  adminName: string;
  date: Date;
};

export const expenseSchema: z.ZodType<Expense> = z.object({
  id: z.number(),
  sum: z.number(),
  comment: z.string(),
  adminName: z.string(),
  date: z.date(),
});
