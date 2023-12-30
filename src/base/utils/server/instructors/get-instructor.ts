import { prisma } from '@/server/db';
import type { Instructor } from '@/components/sections/instructors/instructor-file/types';

export const getInstructor = async (instructorId: number): Promise<Instructor | null> => {
  try {
    const instructor = await prisma.instructor.findUnique({
      where: {
        id: instructorId,
      },
      select: {
        id: true,
        phone: true,
        createdAt: true,
        account: {
          select: {
            fullName: true,
            username: true,
          },
        },
      },
    });

    if (!instructor) return null;

    return {
      id: instructor.id,
      profilePicture: '',

      info: {
        fullName: instructor.account.fullName,
        username: instructor.account.username,
        phone: instructor.phone,
        dateJoined: instructor.createdAt,
      },
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};
