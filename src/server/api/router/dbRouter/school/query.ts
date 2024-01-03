import { createTRPCRouter, orgAdminOnlyPrecedure } from '@/server/api/trpc';

export const queryRouter = createTRPCRouter({
  get: orgAdminOnlyPrecedure.query(
    async ({ ctx }) =>
      await ctx.prisma.school.findUnique({
        where: {
          clerkOrgId: ctx.orgId,
        },
        select: {
          name: true,
          clerkOrgId: true,
          address: true,
          email: true,
          phone: true,
          fax: true,
          city: true,
          theoryHours: true,
          practiceHours: true,
          numRegistrePermis: true,
          numRegistreCommerce: true,
          numRegistreFiscale: true,
        },
      }),
  ),
});
