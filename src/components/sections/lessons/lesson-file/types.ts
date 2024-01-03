import type { LessonStatus } from '@prisma/client';

export type FetchedLesson = {
  id: number;
  instructor: {
    id: number;
    fullName: string;
    profilePicture: string;
  };
  student: {
    id: number;
    fullName: string;
    profilePicture: string;
  };
  status: LessonStatus;
  comment: string;
  grade: number;
  price: number;
  duration: number;
  scheduledDate: Date;
};
