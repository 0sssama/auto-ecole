import { FetchedLicenseFile } from "@/components/sections/license-files/license-file/types";
import { prisma } from "@/server/db";

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

      customer: {
        select: {
          id: true,
          firstNameFr: true,
          lastNameFr: true,
        },
      },

      instructor: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },

      createdBy: {
        select: {
          id: true,
          fullName: true,
        },
      },
    },
  });

  if (!licenseFile) return null;

  const formattedLicenseFile = {
    id: licenseFile.id,
    status: licenseFile.status,
    price: licenseFile.price,
    createdAt: licenseFile.createdAt,

    student: {
      id: licenseFile.customer.id,
      fullName: `${licenseFile.customer.firstNameFr} ${licenseFile.customer.lastNameFr}`,
    },

    instructor: {
      id: licenseFile.instructor.id,
      fullName: `${licenseFile.instructor.firstName} ${licenseFile.instructor.lastName}`,
    },

    createdBy: {
      id: licenseFile.createdBy.id,
      fullName: licenseFile.createdBy.fullName,
    },
  };

  return formattedLicenseFile;
};
