import { clerkClient } from "@clerk/nextjs";

import { createTRPCRouter, orgAdminOnlyPrecedure } from "@/server/api/trpc";

export const queryRouter = createTRPCRouter({
  list: orgAdminOnlyPrecedure.query(async ({ ctx }) => {
    const users = await clerkClient.organizations.getOrganizationMembershipList(
      {
        organizationId: ctx.orgId,
      },
    );

    return users.map((user) => ({
      firstName: user.publicUserData?.firstName || "N/A",
      lastName: user.publicUserData?.lastName || "N/A",
    }));
  }),
});
