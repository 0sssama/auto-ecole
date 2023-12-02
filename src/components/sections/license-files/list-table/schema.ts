import { z } from "zod";
import { Category, LicenseFileStatus } from "@prisma/client";

export type LicenseFile = {
  id: number;
  instructor: {
    id: number;
    name: string;
  };
  student: {
    id: number;
    name: string;
  };
  category: Category;
  price: number;
  status: LicenseFileStatus;
};

export const licenseFileSchema: z.ZodType<LicenseFile> = z.object({
  id: z.number(),
  instructor: z.object({
    id: z.number(),
    name: z.string(),
  }),
  student: z.object({
    id: z.number(),
    name: z.string(),
  }),
  category: z.nativeEnum(Category),
  price: z.number(),
  status: z.nativeEnum(LicenseFileStatus),
});
