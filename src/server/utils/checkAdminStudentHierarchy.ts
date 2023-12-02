import { auth, clerkClient } from "@clerk/nextjs";

import { prisma } from "@/server/db";

export const checkAdminStudentHierarchy = async (studentId: number) => {
  if (studentId <= 0) return false;

  const sesh = auth();

  if (!sesh.userId || !sesh.orgId) return false;

  const [memberships, studentDb] = await Promise.all([
    clerkClient.organizations.getOrganizationMembershipList({
      organizationId: sesh.orgId,
    }),
    prisma.customer.findUnique({
      where: {
        id: studentId,
      },
      select: {
        clerkUserId: true,
      },
    }),
  ]);

  if (!studentDb) return false;

  const membership = memberships.find(
    (m) => m.publicUserData?.userId === sesh.userId,
  );

  if (!membership) return false;

  if (studentDb.clerkUserId === sesh.userId) return true;

  if (membership.role !== "admin") return false;

  // UNCOMMENT BEFORE RELEASE

  // const studentMembership = memberships.find(
  //   (m) => m.publicUserData?.userId === studentDb.clerkUserId,
  // );

  // if (!studentMembership) return false;

  return true;
};
