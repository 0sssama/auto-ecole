import memoize from 'lodash/memoize';
import { auth } from '@clerk/nextjs';

import { prisma } from '@/server/db';

export const userIsSuperAdmin = memoize(async (): Promise<boolean> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId || typeof userId !== 'string' || typeof orgId !== 'string') return false;

  try {
    const user = await prisma.admin.findUnique({
      where: {
        clerkId: userId,
        clerkOrgId: orgId,
      },
    });

    return user !== null && user.rank === 'SUPER_ADMIN';
  } catch {
    return false;
  }
});
