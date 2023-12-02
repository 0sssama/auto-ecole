import { z } from "zod";
import { Category, LicenseFileStatus } from "@prisma/client";

import { isDigits } from "@/utils/isDigits";

export const licenseFileFormSchema = z.object({
  studentId: z.string().refine(isDigits),
  instructorId: z.string().refine(isDigits),
  price: z.string().refine(isDigits),
  category: z.nativeEnum(Category),
  status: z.nativeEnum(LicenseFileStatus),
});

export const licenseFileBackendInputSchema = z.object({
  ...licenseFileFormSchema.shape,
  studentId: z.number().min(1),
  instructorId: z.number().min(1),
  price: z.number().min(0),
});
