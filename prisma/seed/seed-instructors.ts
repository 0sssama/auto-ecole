import { faker } from '@faker-js/faker';
import type { PrismaClient } from '@prisma/client';

import { clerkOrgId } from '../seed';

export const seedInstructors = async (prisma: PrismaClient) =>
  prisma.$transaction(
    faker.helpers.multiple(
      () => {
        const instructorFirstName = faker.person.firstName();
        const instructorLastName = faker.person.lastName();

        return prisma.instructor.create({
          data: {
            firstName: instructorFirstName,
            lastName: instructorLastName,

            phone: faker.phone.number(),

            account: {
              create: {
                username: faker.internet.userName(),
                clerkId: faker.string.uuid(),
                clerkOrgId,
                fullName: `${instructorFirstName} ${instructorLastName}`,
                rank: 'INSTRUCTOR',

                school: {
                  connect: {
                    clerkOrgId,
                  },
                },
              },
            },

            school: {
              connect: {
                clerkOrgId,
              },
            },
          },
        });
      },
      { count: 5 },
    ),
  );
