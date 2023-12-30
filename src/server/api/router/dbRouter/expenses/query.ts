import { z } from 'zod';

import { createTRPCRouter, orgAdminOnlyPrecedure } from '@/server/api/trpc';
import { countPages } from '@/utils/count-pages';
import type { VehicleExpense } from '@/components/sections/vehicles/vehicle-report/expenses-table/schema';

export const queryRouter = createTRPCRouter({
  listByVehicleId: orgAdminOnlyPrecedure
    .input(
      z.object({
        vehicleId: z.number(),
        pageIndex: z.number().default(0),
        pageSize: z.number().default(10),
        filters: z.object({
          search: z.string(),
        }),
      }),
    )
    .query(async ({ input, ctx }) => {
      const [vehicleExpenses, totalVehicleExpenses] = await Promise.all([
        ctx.prisma.expense.findMany({
          where: {
            vehicleId: input.vehicleId,
            createdBy: {
              clerkOrgId: ctx.orgId,
            },
          },
          select: {
            id: true,
            sum: true,
            comment: true,
            createdAt: true,
            createdBy: {
              select: {
                fullName: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
          skip: input.pageIndex * input.pageSize,
          take: input.pageSize,
        }),
        ctx.prisma.expense.count({
          where: {
            vehicleId: input.vehicleId,
            createdBy: {
              clerkOrgId: ctx.orgId,
            },
          },
        }),
      ]);

      const formattedVehicleExpenses: VehicleExpense[] = vehicleExpenses.map((payment) => {
        return {
          id: payment.id,
          sum: payment.sum,
          comment: payment.comment,
          adminName: payment.createdBy.fullName,
          date: payment.createdAt,
        };
      });

      return {
        data: formattedVehicleExpenses,
        pageCount: countPages(totalVehicleExpenses, input.pageSize),
      };
    }),
});
