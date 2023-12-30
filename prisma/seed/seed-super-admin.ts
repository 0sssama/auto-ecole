import type { PrismaClient } from '@prisma/client';

import { superAdminClerkId, clerkOrgId, secretaryClerkId } from '../seed';

export const seedSuperAdmin = async (prisma: PrismaClient) =>
  prisma.admin.upsert({
    where: {
      clerkId: superAdminClerkId,
    },
    create: {
      username: 'ecpp_super_admin',
      clerkId: superAdminClerkId,
      clerkOrgId,
      fullName: 'ECPP SUPER ADMIN',
      rank: 'SUPER_ADMIN',
    },
    update: {},
  });

export const seedSecretary = async (prisma: PrismaClient) =>
  prisma.admin.upsert({
    where: {
      clerkId: secretaryClerkId,
    },
    create: {
      username: 'ecpp_secretary',
      clerkId: secretaryClerkId,
      clerkOrgId,
      fullName: 'ECPP SECRETARY',
      rank: 'SECRETARY',
    },
    update: {},
  });
