import type { PrismaClient } from '@prisma/client';

import { superAdminClerkIds, clerkOrgId, secretaryClerkIds } from '../seed';

export const seedSuperAdmins = async (prisma: PrismaClient) =>
  prisma.$transaction(
    superAdminClerkIds.map((superAdminClerkId) =>
      prisma.admin.upsert({
        where: {
          clerkId: superAdminClerkId.id,
        },
        create: {
          username: superAdminClerkId.username,
          clerkId: superAdminClerkId.id,
          clerkOrgId,
          fullName: superAdminClerkId.fullName,
          rank: 'SUPER_ADMIN',

          school: {
            connect: {
              clerkOrgId,
            },
          },
        },
        update: {},
      }),
    ),
  );

export const seedSecretaries = async (prisma: PrismaClient) =>
  prisma.$transaction(
    secretaryClerkIds.map((secretaryClerkId) =>
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

          school: {
            connect: {
              clerkOrgId,
            },
          },
        },
        update: {},
      }),
    ),
  );
