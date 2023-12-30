import { z } from 'zod';

export type StudentPayment = {
  id: number;
  sum: number;
  comment: string;
  adminName: string;
  date: Date;
};

export const studentPaymentSchema: z.ZodType<StudentPayment> = z.object({
  id: z.number(),
  sum: z.number(),
  comment: z.string(),
  adminName: z.string(),
  date: z.date(),
});
