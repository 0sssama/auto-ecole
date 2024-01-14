import { schoolSettingsFormSchema } from '@/base/schemas/school-settings-form.schema';
import { createTRPCRouter, orgSuperAdminOnlyPrecedure } from '@/server/api/trpc';

export const mutationRouter = createTRPCRouter({
  update: orgSuperAdminOnlyPrecedure.input(schoolSettingsFormSchema).mutation(
    async ({ ctx, input }) =>
      await ctx.prisma.school.update({
        where: {
          clerkOrgId: ctx.orgId,
        },
        data: {
          ...input,
        },
      }),
  ),
});
