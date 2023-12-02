import { z } from "zod";

export type LicenseFilePayment = {
  id: number;
  sum: number;
  comment: string;
  adminName: string;
  date: Date;
};

export const licenseFilePaymentSchema: z.ZodType<LicenseFilePayment> = z.object(
  {
    id: z.number(),
    sum: z.number(),
    comment: z.string(),
    adminName: z.string(),
    date: z.date(),
  },
);
