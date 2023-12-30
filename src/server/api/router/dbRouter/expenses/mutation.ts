import { z } from 'zod';

import { createTRPCRouter, orgAdminOnlyPrecedure, orgSuperAdminOnlyPrecedure } from '@/server/api/trpc';
import { vehicleExpenseBackendSchema } from '@/base/schemas/vehicle-expense-form-schema';
import { licenseFileExpenseBackendSchema } from '@/base/schemas/license-file-expense-form-schema';

export const mutationRouter = createTRPCRouter({
  addToVehicle: orgAdminOnlyPrecedure.input(vehicleExpenseBackendSchema).mutation(async ({ ctx, input }) => {
    const expense = await ctx.prisma.expense.create({
      data: {
        sum: input.sum,
        comment: input.comment,
        date: input.date,

        vehicle: {
          connect: {
            id: input.vehicleId,
          },
        },

        createdBy: {
          connect: { clerkId: ctx.userId },
        },
      },
    });

    return { id: expense.id };
  }),
  addToLicenseFile: orgAdminOnlyPrecedure.input(licenseFileExpenseBackendSchema).mutation(async ({ ctx, input }) => {
    const expense = await ctx.prisma.expense.create({
      data: {
        sum: input.sum,
        comment: input.comment,
        date: input.date,

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
        },
      });

      return { id: input.expenseId };
    }),
});
