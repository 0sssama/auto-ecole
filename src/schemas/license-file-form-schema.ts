import { z } from "zod";
import { Category, LicenseFileStatus } from "@prisma/client";

export const LicenseFileFormSchema = z.object({
  studentId: z.string().regex(/^[0-9]*$/),
  instructorId: z.string().regex(/^[0-9]*$/),
  price: z.string().regex(/^[0-9]*$/),
  category: z.nativeEnum(Category),
  status: z.nativeEnum(LicenseFileStatus),
});

export const LicenseFileBackendInputSchema = z.object({
  ...LicenseFileFormSchema.shape,
  studentId: z.number().min(1),
  instructorId: z.number().min(1),
  price: z.number().min(0),
});
