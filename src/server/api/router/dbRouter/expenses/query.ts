import { z } from 'zod';

import { createTRPCRouter, orgAdminOnlyPrecedure, orgSuperAdminOnlyPrecedure } from '@/server/api/trpc';
import { countPages } from '@/base/utils/client/count-pages';
import type { VehicleExpense } from '@/components/sections/vehicles/vehicle-report/expenses-table/schema';
import type { LicenseFileExpense } from '@/components/sections/license-files/license-file/expenses-table/schema';
import type { Expense } from '@/components/sections/expenses/list-table/schema';

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
            date: true,
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
          date: payment.date,
        };
      });

      return {
        data: formattedVehicleExpenses,
        pageCount: countPages(totalVehicleExpenses, input.pageSize),
      };
    }),

  listByLicenseFileId: orgAdminOnlyPrecedure
    .input(
      z.object({
        licenseFileId: z.number(),
        pageIndex: z.number().default(0),
        pageSize: z.number().default(10),
        filters: z.object({
          search: z.string(),
        }),
      }),
    )
    .query(async ({ input, ctx }) => {
      const [licenseFileExpenses, totalLicenseFileExpenses] = await Promise.all([
        ctx.prisma.expense.findMany({
          where: {
            licenseFileId: input.licenseFileId,
            createdBy: {
              clerkOrgId: ctx.orgId,
            },
          },
          select: {
            id: true,
            sum: true,
            comment: true,
            date: true,
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
            licenseFileId: input.licenseFileId,
            createdBy: {
              clerkOrgId: ctx.orgId,
            },
          },
        }),
      ]);

      const formattedLicenseFileExpenses: LicenseFileExpense[] = licenseFileExpenses.map((expense) => {
        return {
          id: expense.id,
          sum: expense.sum,
          comment: expense.comment,
          adminName: expense.createdBy.fullName,
          date: expense.date,
        };
      });

      return {
        data: formattedLicenseFileExpenses,
        pageCount: countPages(totalLicenseFileExpenses, input.pageSize),
      };
    }),

  list: orgSuperAdminOnlyPrecedure
    .input(
      z.object({
        pageIndex: z.number().default(0),
        pageSize: z.number().default(10),
        filters: z.object({
          search: z.string(),
        }),
      }),
    )
    .query(async ({ input, ctx }) => {
      const [expenses, totalExpenses] = await Promise.all([
        ctx.prisma.expense.findMany({
          where: {
            createdBy: {
              clerkOrgId: ctx.orgId,
            },
          },
          select: {
            id: true,
            sum: true,
            comment: true,
            date: true,
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
            createdBy: {
              clerkOrgId: ctx.orgId,
            },
          },
        }),
      ]);

      const formattedExpenses: Expense[] = expenses.map((expense) => {
        return {
          id: expense.id,
          sum: expense.sum,
          comment: expense.comment,
          adminName: expense.createdBy.fullName,
          date: expense.date,
        };
      });

      return {
        data: formattedExpenses,
        pageCount: countPages(totalExpenses, input.pageSize),
      };
    }),
});
