import { z } from "zod";

export type Payment = {
  id: number;
  sum: number;
  comment: string;
  adminName: string;
  date: Date;
};

export const paymentSchema: z.ZodType<Payment> = z.object({
  id: z.number(),
  sum: z.number(),
  comment: z.string(),
  adminName: z.string(),
  date: z.date(),
});
