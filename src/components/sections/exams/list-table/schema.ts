import { z } from "zod";
import { ExamStatus, ExamType } from "@prisma/client";

export type Exam = {
  id: number;
  status: ExamStatus;
  type: ExamType;
  date: Date;
};

export const examSchema: z.ZodType<Exam> = z.object({
  id: z.number(),
  status: z.nativeEnum(ExamStatus),
  type: z.nativeEnum(ExamType),
  date: z.date(),
});
