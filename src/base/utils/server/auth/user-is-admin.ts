import { clerkClient } from '@clerk/nextjs';
import memoize from 'lodash/memoize';

export const userIsAdmin = memoize(async (userId: string, orgId: string): Promise<boolean> => {
  if (!userId || !orgId || typeof userId !== 'string' || typeof orgId !== 'string') return false;

  const memberships = await clerkClient.organizations.getOrganizationMembershipList({
    organizationId: orgId,
  });

  const membership = memberships.find((m) => m.publicUserData?.userId === userId);

  return membership !== undefined && membership.role === 'admin';
});
