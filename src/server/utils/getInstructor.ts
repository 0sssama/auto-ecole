import { Instructor } from "@/components/sections/instructor-file/types";
import { prisma } from "@/server/db";

export const getInstructor = async (
  instructorId: number,
): Promise<Instructor | null> => {
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
      profilePictureUrl: null,

      info: {
        fullName: instructor.account.fullName,
        username: instructor.account.username,
        phone: instructor.phone,
        dateJoined: instructor.createdAt,
      },
    };
  } catch (err) {
    console.error(err);
    return null;
  }
};
