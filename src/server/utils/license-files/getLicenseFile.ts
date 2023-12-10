import { clerkClient } from "@clerk/nextjs";

import { prisma } from "@/server/db";
import type { FetchedLicenseFile } from "@/components/sections/license-files/license-file/types";

export const getLicenseFile = async (
  id: number,
): Promise<FetchedLicenseFile | null> => {
  if (id <= 0) return null;

  const licenseFile = await prisma.licenseFile.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      status: true,
      price: true,
      createdAt: true,

      student: {
        select: {
          id: true,
          firstNameFr: true,
          lastNameFr: true,
          clerkUserId: true,
        },
      },

      instructor: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          account: {
            select: {
              clerkId: true,
            },
          },
        },
      },

      createdBy: {
        select: {
          id: true,
          fullName: true,
          clerkId: true,
        },
      },
    },
  });

  if (!licenseFile) return null;

  const [student, instructor, admin] = await clerkClient.users.getUserList({
    userId: [
      licenseFile.student.clerkUserId,
      licenseFile.instructor.account.clerkId,
      licenseFile.createdBy.clerkId,
    ],
  });

  if (!student || !instructor || !admin) return null;

  const formattedLicenseFile: FetchedLicenseFile = {
    id: licenseFile.id,

    student: {
      id: licenseFile.student.id,
      fullName: `${licenseFile.student.firstNameFr} ${licenseFile.student.lastNameFr}`,
      profilePictureUrl: student.hasImage ? student.imageUrl : "",
    },

    instructor: {
      id: licenseFile.instructor.id,
      fullName: `${licenseFile.instructor.firstName} ${licenseFile.instructor.lastName}`,
      profilePictureUrl: instructor.hasImage ? instructor.imageUrl : "",
    },

    createdBy: {
      id: licenseFile.createdBy.id,
      fullName: licenseFile.createdBy.fullName,
      profilePictureUrl: admin.hasImage ? admin.imageUrl : "",
    },

    licenseFileStatus: licenseFile.status,
    price: licenseFile.price,
    createdAt: licenseFile.createdAt,
  };

  return formattedLicenseFile;
};
