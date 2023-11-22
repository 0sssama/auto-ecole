import { z } from "zod";
import { LessonStatus } from "@prisma/client";

export const lessonFormSchema = z.object({
  studentId: z.string().regex(/^[0-9]*$/),
  instructorId: z.string().regex(/^[0-9]*$/),
  licenseFileId: z.number().min(1).optional(),
  price: z.string().regex(/^[0-9]*$/),
  duration: z.string().regex(/^[0-9]*$/),
  status: z.nativeEnum(LessonStatus),
  date: z.date(),
});

export const lessonFormBackendInputSchema = z.object({
  ...lessonFormSchema.shape,
  licenseFileId: z.number().min(1).optional(),
  studentId: z.number().min(1),
  instructorId: z.number().min(1),
  price: z.number().min(0),
  duration: z.number().min(1),
});
