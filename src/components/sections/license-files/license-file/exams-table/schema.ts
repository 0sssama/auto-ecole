import { z } from "zod";
import { ExamStatus, ExamType } from "@prisma/client";

export type LicenseFileExam = {
  id: number;
  status: ExamStatus;
  type: ExamType;
  date: Date;
};

export const licenseFileExamSchema: z.ZodType<LicenseFileExam> = z.object({
  id: z.number(),
  status: z.nativeEnum(ExamStatus),
  type: z.nativeEnum(ExamType),
  date: z.date(),
});
