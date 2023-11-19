import { z } from "zod";
import { LessonStatus } from "@prisma/client";

export type LicenseFileLesson = {
  id: number;
  status: LessonStatus;
  comment: string;
  grade: number;
  price: number;
  duration: number;
  scheduledDate: Date;
};

export const licenseFileLessonSchema: z.ZodType<LicenseFileLesson> = z.object({
  id: z.number(),
  status: z.nativeEnum(LessonStatus),
  comment: z.string(),
  grade: z.number(),
  price: z.number(),
  duration: z.number(),
  scheduledDate: z.date(),
});
