import { PrismaClient } from "@prisma/client";
import { superAdminClerkId, clerkOrgId } from "../seed";

export const seedSuperAdmin = async (prisma: PrismaClient) =>
  prisma.admin.upsert({
    where: {
      clerkId: superAdminClerkId,
    },
    create: {
      username: "ecpp_super_admin",
      clerkId: superAdminClerkId,
      clerkOrgId,
      fullName: "ECPP SUPER ADMIN",
      rank: "SUPER_ADMIN",
    },
    update: {},
  });
