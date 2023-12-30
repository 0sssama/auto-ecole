import { z } from 'zod';
import { LessonStatus } from '@prisma/client';

export type Lesson = {
  id: number;
  instructor: {
    id: number;
    fullName: string;
  };
  student: {
    id: number;
    fullName: string;
  };
  status: LessonStatus;
  price: number;
  duration: number;
  scheduledDate: Date;
};

export const lessonSchema: z.ZodType<Lesson> = z.object({
  id: z.number(),
  instructor: z.object({
    id: z.number(),
    fullName: z.string(),
  }),
  student: z.object({
    id: z.number(),
    fullName: z.string(),
  }),
  status: z.nativeEnum(LessonStatus),
  price: z.number(),
  duration: z.number(),
  scheduledDate: z.date(),
});
