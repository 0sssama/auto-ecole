import { z } from "zod";
import { Category, LicenseFileStatus } from "@prisma/client";

export type StudentLicenseFile = {
  id: number;
  instructorId: number;
  instructorName: string;
  category: Category;
  price: number;
  status: LicenseFileStatus;
  createdAt: Date;
};

export const licenseFileSchema: z.ZodType<StudentLicenseFile> = z.object({
  id: z.number(),
  instructorId: z.number(),
  instructorName: z.string(),
  category: z.nativeEnum(Category),
  price: z.number(),
  status: z.nativeEnum(LicenseFileStatus),
  createdAt: z.date(),
});
