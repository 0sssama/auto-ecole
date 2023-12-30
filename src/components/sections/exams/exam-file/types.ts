import type { ExamStatus, ExamType } from '@prisma/client';

export type FetchedExam = {
  id: number;
  status: ExamStatus;
  type: ExamType;
  date: Date;

  student: {
    id: string;
    fullName: string;
    profilePictureUrl: string;
  };
};
