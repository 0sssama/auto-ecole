import memoize from 'lodash/memoize';

import { prisma } from '../../db';

export const userIsSuperAdmin = memoize(async (userId: string, orgId: string): Promise<boolean> => {
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
