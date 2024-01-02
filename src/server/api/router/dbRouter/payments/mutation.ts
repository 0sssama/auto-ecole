import { TRPCError } from '@trpc/server';

import { licenseFilePaymentBackendInputSchema } from '@/base/schemas/license-file-payment-form-schema';
import { createTRPCRouter, orgAdminOnlyPrecedure } from '@/server/api/trpc';

export const mutationRouter = createTRPCRouter({
  addToLicenseFile: orgAdminOnlyPrecedure
    .input(licenseFilePaymentBackendInputSchema)
    .mutation(async ({ ctx, input }) => {
      const payment = await ctx.prisma.payment.create({
        data: {
          sum: input.sum,
          comment: input.comment,
          date: input.date,

          cashFund: {
            connect: {
              clerkOrgId: ctx.userId,
            },
          },

          licenseFile: {
            connect: {
              id: input.licenseFileId,
            },
          },

          createdBy: {
            connect: { clerkId: ctx.userId },
          },
        },
      });

      if (!payment) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });

      return { id: payment.id };
    }),
});
