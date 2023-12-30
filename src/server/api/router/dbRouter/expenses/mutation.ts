import { TRPCError } from '@trpc/server';

import { createTRPCRouter, orgAdminOnlyPrecedure } from '@/server/api/trpc';
import { vehicleExpenseBackendSchema } from '@/schemas/vehicle-expense-form-schema';

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

    if (!expense) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });

    return { id: expense.id };
  }),
});
