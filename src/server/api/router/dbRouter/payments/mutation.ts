import { TRPCError } from '@trpc/server';

import { createTRPCRouter, orgAdminOnlyPrecedure } from '@/server/api/trpc';
import { paymentBackendInputSchema } from '@/base/schemas/payment-form.schema';

export const mutationRouter = createTRPCRouter({
  add: orgAdminOnlyPrecedure.input(paymentBackendInputSchema).mutation(async ({ ctx, input }) => {
    const payment = await ctx.prisma.payment.create({
      data: {
        sum: input.sum,
        comment: input.comment,
        date: input.date,

        cashFund: {
          connect: {
            clerkOrgId: ctx.orgId,
          },
        },

        ...(input.licenseFileId
          ? {
              licenseFile: {
                connect: {
                  id: input.licenseFileId,
                },
              },
            }
          : {}),

        createdBy: {
          connect: { clerkId: ctx.userId },
        },
      },
    });

    if (!payment) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });

    return { id: payment.id };
  }),
});
