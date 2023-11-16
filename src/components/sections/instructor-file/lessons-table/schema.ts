import { z } from "zod";
import { LessonStatus } from "@prisma/client";

export type InstructorLesson = {
  id: number;
  studentId: number;
  studentName: string;
  status: LessonStatus;
  comment: string;
  grade: number;
  price: number;
  duration: number;
  scheduledDate: Date;
};

export const instructorLessonSchema: z.ZodType<InstructorLesson> = z.object({
  id: z.number(),
  studentId: z.number(),
  studentName: z.string(),
  status: z.nativeEnum(LessonStatus),
  comment: z.string(),
  grade: z.number(),
  price: z.number(),
  duration: z.number(),
  scheduledDate: z.date(),
});
