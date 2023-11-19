import { faker } from "@faker-js/faker";
import { ExamStatus, ExamType, PrismaClient } from "@prisma/client";

export const seedExams = async (prisma: PrismaClient, licenseFiles: any[]) =>
  prisma.$transaction(
    faker.helpers.multiple(
      () =>
        prisma.exam.create({
          data: {
            date: faker.date.future(),
            status: faker.helpers.enumValue(ExamStatus),
            type: faker.helpers.enumValue(ExamType),

            licenseFile: {
              connect: {
                id: licenseFiles[faker.number.int(licenseFiles.length - 1)].id,
              },
            },
          },
        }),
      { count: 200 },
    ),
  );
