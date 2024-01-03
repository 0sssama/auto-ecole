import { prisma } from '@/server/db';
import type { FetchedExam } from '@/components/sections/exams/exam-file/types';

export const getExam = async (id: number): Promise<FetchedExam | null> => {
  if (id <= 0) return null;

  const exam = await prisma.exam.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      status: true,
      type: true,
      date: true,
      licenseFile: {
        select: {
          student: {
            select: {
              id: true,
              clerkUserId: true,
              profilePicture: true,
              firstNameFr: true,
              lastNameFr: true,
            },
          },
        },
      },
    },
  });

  if (!exam) return null;

  const formattedExam: FetchedExam = {
    id: exam.id,
    status: exam.status,
    type: exam.type,
    date: exam.date,
    student: {
      id: exam.licenseFile.student.clerkUserId,
      fullName: `${exam.licenseFile.student.firstNameFr} ${exam.licenseFile.student.lastNameFr}`,
      profilePicture: exam.licenseFile.student.profilePicture,
    },
  };

  return formattedExam;
};
