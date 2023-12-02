import { clerkClient } from "@clerk/nextjs";

import { prisma } from "@/server/db";
import type { FetchedLesson } from "@/components/sections/lessons/lesson-file/types";

export const getLesson = async (id: number): Promise<FetchedLesson | null> => {
  if (id <= 0) return null;

  const lesson = await prisma.lesson.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      status: true,
      createdAt: true,
      price: true,
      comment: true,
      duration: true,
      date: true,
      grade: true,
      instructor: {
        select: {
          id: true,
          lastName: true,
          firstName: true,
          account: {
            select: {
              clerkId: true,
            },
          },
        },
      },
      customer: {
        select: {
          id: true,
          lastNameFr: true,
          firstNameFr: true,
          clerkUserId: true,
        },
      },
    },
  });

  if (!lesson) return null;

  const [student, instructor] = await clerkClient.users.getUserList({
    userId: [lesson.customer.clerkUserId, lesson.instructor.account.clerkId],
  });

  if (!student || !instructor) return null;

  const formattedLesson: FetchedLesson = {
    id: lesson.id,
    instructor: {
      id: lesson.instructor.id,
      fullName: `${lesson.instructor.firstName} ${lesson.instructor.lastName}`,
      profilePictureUrl: instructor.hasImage ? instructor.imageUrl : "",
    },
    student: {
      id: lesson.customer.id,
      fullName: `${lesson.customer.firstNameFr} ${lesson.customer.lastNameFr}`,
      profilePictureUrl: student.hasImage ? student.imageUrl : "",
    },
    status: lesson.status,
    comment: lesson.comment,
    grade: lesson.grade,
    price: lesson.price,
    duration: lesson.duration,
    scheduledDate: lesson.date,
  };

  return formattedLesson;
};
