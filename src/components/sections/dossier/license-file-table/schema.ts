import { z } from "zod";
import { Category, LicenseFileStatus } from "@prisma/client";

export type LicenseFile = {
  id: number;
  status: LicenseFileStatus;
  category: Category;
  createdAt: Date;
};

export const licenseFileSchema: z.ZodType<LicenseFile> = z.object({
  id: z.number(),
  status: z.nativeEnum(LicenseFileStatus),
  category: z.nativeEnum(Category),
  createdAt: z.date(),
});
