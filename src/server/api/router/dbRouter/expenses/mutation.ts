import { z } from 'zod';

import { createTRPCRouter, orgSuperAdminOnlyPrecedure } from '@/server/api/trpc';
import { expenseBackendSchema } from '@/base/schemas/expense-form.schema';

export const mutationRouter = createTRPCRouter({
  add: orgSuperAdminOnlyPrecedure.input(expenseBackendSchema).mutation(async ({ ctx, input }) => {
    const expense = await ctx.prisma.expense.create({
      data: {
        sum: input.sum,
        comment: input.comment,
        date: input.date,

        cashFund: {
          connect: {
            clerkOrgId: ctx.orgId,
          },
        },

        ...(input.licenseFileId ? { licenseFile: { connect: { id: input.licenseFileId } } } : {}),
        ...(input.vehicleId
          ? {
              vehicle: {
                connect: {
                  id: input.vehicleId,
                },
              },
            }
          : {}),

        createdBy: {
          connect: { clerkId: ctx.userId },
        },
      },
    });

    return { id: expense.id };
  }),

  delete: orgSuperAdminOnlyPrecedure
    .input(
      z.object({
        expenseId: z.number().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.expense.delete({
        where: {
          id: input.expenseId,
          cashFund: {
            clerkOrgId: ctx.orgId,
          },
        },
      });

      return { id: input.expenseId };
    }),
});
