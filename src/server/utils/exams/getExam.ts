import { FetchedExam } from "@/components/sections/exams/exam-file/types";
import { prisma } from "@/server/db";
import { clerkClient } from "@clerk/nextjs";

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
          customer: {
            select: {
              clerkUserId: true,
            },
          },
        },
      },
    },
  });

  if (!exam) return null;

  const student = await clerkClient.users.getUser(
    exam.licenseFile.customer.clerkUserId,
  );

  if (!student) return null;

  const formattedExam: FetchedExam = {
    id: exam.id,
    status: exam.status,
    type: exam.type,
    date: exam.date,
    student: {
      id: student.id,
      fullName: `${student.firstName} ${student.lastName}`,
      profilePictureUrl: student.hasImage ? student.imageUrl : "",
    },
  };

  return formattedExam;
};
