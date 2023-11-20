import { z } from "zod";
import { Category, LicenseFileStatus } from "@prisma/client";

export type InstructorLicenseFile = {
  id: number;
  studentId: number;
  studentName: string;
  category: Category;
  price: number;
  status: LicenseFileStatus;
  createdAt: Date;
};

export const instructorLicenseFileSchema: z.ZodType<InstructorLicenseFile> =
  z.object({
    id: z.number(),
    studentId: z.number(),
    studentName: z.string(),
    category: z.nativeEnum(Category),
    price: z.number(),
    status: z.nativeEnum(LicenseFileStatus),
    createdAt: z.date(),
  });
