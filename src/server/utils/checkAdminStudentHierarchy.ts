import { auth, clerkClient } from "@clerk/nextjs";
import { prisma } from "@/server/db";

export const checkAdminStudentHierarchy = async (studentId: number) => {
  if (studentId <= 0) return false;

  const sesh = auth();

  if (!sesh.userId || !sesh.orgId) return false;

  const org = await clerkClient.organizations.getOrganization({
    organizationId: sesh.orgId,
  });

  if (!org) return false;

  const memberships =
    await clerkClient.organizations.getOrganizationMembershipList({
      organizationId: sesh.orgId,
    });

  const membership = memberships.find(
    (m) => m.publicUserData?.userId === sesh.userId,
  );

  if (!membership) return false;

  const studentDb = await prisma.customer.findUnique({
    where: {
      id: studentId,
    },
    select: {
      clerkUserId: true,
    },
  });

  if (!studentDb) return false;

  if (studentDb.clerkUserId === sesh.userId) return true;

  if (membership.role !== "admin") return false;

  const studentMembership = memberships.find(
    (m) => m.publicUserData?.userId === studentDb.clerkUserId,
  );

  if (!studentMembership) return false;

  return true;
};
