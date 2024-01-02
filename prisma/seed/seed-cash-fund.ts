import { PrismaClient } from '@prisma/client';

import { clerkOrgId } from '../seed';

export const seedCashFund = async (prisma: PrismaClient) =>
  prisma.cashFund.create({
    data: {
      amount: 0,
      clerkOrgId,

      school: {
        connect: {
          clerkOrgId,
        },
      },
    },
  });
