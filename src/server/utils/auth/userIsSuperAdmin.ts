import memoize from "lodash/memoize";

import { prisma } from "../../db";

export const userIsSuperAdmin = memoize(
  async (userId: string, orgId: string): Promise<boolean> => {
    if (
      !userId ||
      !orgId ||
      typeof userId !== "string" ||
      typeof orgId !== "string"
    )
      return false;

    try {
      const user = await prisma.admin.findUnique({
        where: {
          clerkId: userId,
          clerkOrgId: orgId,
        },
      });

      if (!user || user.rank !== "SUPER_ADMIN") return false;

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
);
