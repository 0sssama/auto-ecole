import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import { clerkOrgId } from "../seed";

export const seedMonitors = async (prisma: PrismaClient) =>
  prisma.$transaction(
    faker.helpers.multiple(
      () => {
        const monitorFirstName = faker.person.firstName();
        const monitorLastName = faker.person.lastName();

        return prisma.monitor.create({
          data: {
            firstName: monitorFirstName,
            lastName: monitorLastName,

            phone: faker.phone.number(),

            account: {
              create: {
                username: faker.internet.userName(),
                clerkId: faker.string.uuid(),
                clerkOrgId,
                fullName: `${monitorFirstName} ${monitorLastName}`,
                rank: "MONITOR",
              },
            },
          },
        });
      },
      { count: 5 },
    ),
  );
