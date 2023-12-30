import { z } from 'zod';

export type VehicleExpense = {
  id: number;
  sum: number;
  comment: string;
  adminName: string;
  date: Date;
};

export const vehicleExpenseSchema: z.ZodType<VehicleExpense> = z.object({
  id: z.number(),
  sum: z.number(),
  comment: z.string(),
  adminName: z.string(),
  date: z.date(),
});
