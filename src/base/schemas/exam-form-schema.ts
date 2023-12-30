import { z } from 'zod';
import { ExamStatus, ExamType } from '@prisma/client';

export const examFormSchema = z.object({
  type: z.nativeEnum(ExamType),
  status: z.nativeEnum(ExamStatus),
  date: z.date(),
});

export const examBackendInputSchema = z.object({
  ...examFormSchema.shape,
  licenseFileId: z.number().min(1),
});
