import { PrismaClient } from "@prisma/client";
import { faker, fakerAR } from "@faker-js/faker";

import { clerkOrgId } from "../seed";

export const seedStudents = async (
  prisma: PrismaClient,
  superAdminId: number,
) =>
  prisma.$transaction(
    faker.helpers.multiple(
      () =>
        prisma.student.create({
          data: {
            clerkOrgId,

            clerkUserId: faker.string.uuid(),

            firstNameFr: faker.person.firstName(),
            firstNameAr: fakerAR.person.firstName(),

            lastNameFr: faker.person.lastName(),
            lastNameAr: faker.person.lastName(),

            addressFr: faker.location.streetAddress(),
            addressAr: fakerAR.location.streetAddress(),

            professionFr: faker.person.jobTitle(),
            professionAr: faker.person.jobTitle(),

            phone: faker.phone.number(),
            cin: faker.string.alphanumeric(8),
            email: faker.internet.email(),
            birthdate: faker.date.past(),

            createdBy: {
              connect: {
                id: superAdminId,
              },
            },
          },
        }),
      { count: 80 },
    ),
  );
