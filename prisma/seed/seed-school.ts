import { PrismaClient } from '@prisma/client';
import { clerkOrgId } from '../seed';

export const seedSchool = async (prisma: PrismaClient) =>
  prisma.school.create({
    data: {
      name: 'ECPP',
      clerkOrgId,
      phone: '0661519014',
    },
  });
