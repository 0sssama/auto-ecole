import { z } from 'zod';
import { LessonStatus } from '@prisma/client';

import { isDigits } from '@/base/utils/client/is-digits';

export const lessonFormSchema = z.object({
  studentId: z.string().refine(isDigits),
  instructorId: z.string().refine(isDigits),
  licenseFileId: z.number().min(1).optional(),
  price: z.string().refine(isDigits),
  duration: z.string().refine(isDigits),
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

export type LessonFormValues = z.infer<typeof lessonFormSchema>;

export type LessonFormBackendInput = z.infer<typeof lessonFormBackendInputSchema>;
