import { clerkClient } from '@clerk/nextjs';

import { prisma } from '@/server/db';
import type { FetchedLesson } from '@/components/sections/lessons/lesson-file/types';

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
      student: {
        select: {
          id: true,
          lastNameFr: true,
          firstNameFr: true,
          clerkUserId: true,
          profilePicture: true,
        },
      },
    },
  });

  if (!lesson) return null;

  const [student, instructor] = await clerkClient.users.getUserList({
    userId: [lesson.student.clerkUserId, lesson.instructor.account.clerkId],
  });

  if (!student || !instructor) return null;

  const formattedLesson: FetchedLesson = {
    id: lesson.id,
    instructor: {
      id: lesson.instructor.id,
      fullName: `${lesson.instructor.firstName} ${lesson.instructor.lastName}`,
      profilePicture: '',
    },
    student: {
      id: lesson.student.id,
      fullName: `${lesson.student.firstNameFr} ${lesson.student.lastNameFr}`,
      profilePicture: lesson.student.profilePicture,
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
