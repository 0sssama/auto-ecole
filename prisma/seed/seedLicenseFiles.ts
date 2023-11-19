import { faker } from "@faker-js/faker";
import {
  Category,
  ExamStatus,
  ExamType,
  LessonStatus,
  LicenseFileStatus,
  PrismaClient,
} from "@prisma/client";

export const seedLicenseFiles = async (
  prisma: PrismaClient,
  instructorIds: number[],
  studentIds: number[],
  superAdminId: number,
) =>
  prisma.$transaction(
    faker.helpers.multiple(
      () => {
        const instructorId =
          instructorIds[faker.number.int(instructorIds.length - 1)];
        const studentId = studentIds[faker.number.int(studentIds.length - 1)];

        return prisma.licenseFile.create({
          data: {
            status: faker.helpers.enumValue(LicenseFileStatus),
            category: faker.helpers.enumValue(Category),
            price: faker.helpers.rangeToNumber({ min: 24, max: 40 }) * 100,
            exams: {
              createMany: {
                data: faker.helpers.multiple(
                  () => ({
                    type: faker.helpers.enumValue(ExamType),
                    date: faker.date.future(),
                    status: faker.helpers.enumValue(ExamStatus),
                  }),
                  { count: faker.helpers.rangeToNumber({ min: 1, max: 3 }) },
                ),
              },
            },

            lessons: {
              create: {
                date: faker.date.past(),
                comment: faker.lorem.sentence(),
                status: faker.helpers.enumValue(LessonStatus),
                duration: faker.helpers.rangeToNumber({ min: 1, max: 2 }),
                price: faker.helpers.rangeToNumber({ min: 1, max: 4 }) * 100,

                payment: {
                  create: {
                    sum: faker.helpers.rangeToNumber({ min: 1, max: 4 }) * 100,
                    comment: faker.lorem.sentence(),
                    date: faker.date.past(),
                    createdAt: faker.date.past(),
                    createdById: superAdminId,
                  },
                },

                createdBy: {
                  connect: {
                    id: superAdminId,
                  },
                },
                customer: {
                  connect: {
                    id: studentId,
                  },
                },
                instructor: {
                  connect: {
                    id: instructorId,
                  },
                },
              },
            },

            payments: {
              createMany: {
                data: faker.helpers.multiple(
                  () => ({
                    sum:
                      faker.helpers.rangeToNumber({ min: 10, max: 20 }) * 100,
                    comment: faker.lorem.sentence(),
                    date: faker.date.past(),
                    createdAt: faker.date.past(),
                    createdById: superAdminId,
                  }),
                  { count: faker.helpers.rangeToNumber({ min: 1, max: 3 }) },
                ),
              },
            },

            customer: {
              connect: {
                id: studentId,
              },
            },
            instructor: {
              connect: {
                id: instructorId,
              },
            },
            createdBy: {
              connect: {
                id: superAdminId,
              },
            },
          },
        });
      },
      {
        count: 20,
      },
    ),
  );
