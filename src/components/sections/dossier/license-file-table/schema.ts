import { z } from "zod";
import { Category, LicenseFileStatus } from "@prisma/client";

export type LicenseFile = {
  id: number;
  category: Category;
  price: number;
  status: LicenseFileStatus;
  createdAt: Date;
};

export const licenseFileSchema: z.ZodType<LicenseFile> = z.object({
  id: z.number(),
  category: z.nativeEnum(Category),
  price: z.number(),
  status: z.nativeEnum(LicenseFileStatus),
  createdAt: z.date(),
});
