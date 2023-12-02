import { z } from "zod";

import { ExamStatus, ExamType } from "@prisma/client";

export type Exam = {
  id: number;
  student: {
    id: number;
    fullName: string;
  };
  status: ExamStatus;
  type: ExamType;
  date: Date;
};

export const examSchema: z.ZodType<Exam> = z.object({
  id: z.number(),
  student: z.object({
    id: z.number(),
    fullName: z.string(),
  }),
  status: z.nativeEnum(ExamStatus),
  type: z.nativeEnum(ExamType),
  date: z.date(),
});
