// import { clerkClient } from "@clerk/nextjs";

import { prisma } from "@/server/db";
import type { VehicleReport } from "@/components/sections/vehicles/vehicle-report/types";

export const getVehicle = async (id: number): Promise<VehicleReport | null> => {
  if (!id || typeof id !== "number" || id <= 0) return null;

  try {
    const vehicle = await prisma.vehicle.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        brand: true,
        image: true,
        type: true,
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
      },
    });

    if (!vehicle) return null;

    /* TODO: UNCOMMENT IN PROD */
    // const instructor = await clerkClient.users.getUser(
    //   vehicle.instructor.account.clerkId
    // );

    // if (!instructor) return null;

    return {
      id: vehicle.id,
      name: vehicle.name,
      brand: vehicle.brand,
      image: vehicle.image,
      type: vehicle.type,
      instructor: {
        id: vehicle.instructor.id,
        fullName: `${vehicle.instructor.firstName} ${vehicle.instructor.lastName}`,
        profilePictureUrl: null,
        // profilePictureUrl: instructor.hasImage ? instructor.imageUrl : null,
      },
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};
