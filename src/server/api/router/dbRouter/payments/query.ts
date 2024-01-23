import { z } from 'zod';

import { createTRPCRouter, orgAdminOnlyPrecedure } from '@/server/api/trpc';
import { countPages } from '@/base/utils/client/count-pages';
import type { Payment } from '@/components/sections/payments/list-table/schema';
import type { StudentPayment } from '@/components/sections/students/student-file/payments-table/schema';
import type { LicenseFilePayment } from '@/components/sections/license-files/license-file/payments-table/schema';

import { getWhereObjFromFilters } from './utils';

export const queryRouter = createTRPCRouter({
  list: orgAdminOnlyPrecedure
    .input(
      z.object({
        pageIndex: z.number().default(0),
        pageSize: z.number().default(10),
        filters: z.object({
          search: z.string(),
          licenseFileStatus: z.array(z.string()),
        }),
      }),
    )
    .query(async ({ input, ctx }) => {
      const filtersObj = getWhereObjFromFilters(input.filters);

      const [payments, totalPayments] = await Promise.all([
        ctx.prisma.payment.findMany({
          where: {
            cashFund: {
              clerkOrgId: ctx.orgId,
            },
            ...filtersObj,
          },
          select: {
            id: true,
            sum: true,
            comment: true,
            createdBy: {
              select: {
                fullName: true,
              },
            },
            createdAt: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
          skip: input.pageIndex * input.pageSize,
          take: input.pageSize,
        }),
        ctx.prisma.payment.count({
          where: {
            cashFund: {
              clerkOrgId: ctx.orgId,
            },
            ...filtersObj,
          },
        }),
      ]);

      const formattedPayments: Payment[] = payments.map((payment) => {
        return {
          id: payment.id,
          sum: payment.sum,
          comment: payment.comment,
          adminName: payment.createdBy.fullName,
          date: payment.createdAt,
        };
      });

      return {
        data: formattedPayments,
        pageCount: countPages(totalPayments, input.pageSize),
      };
    }),

  listByLicenseFileId: orgAdminOnlyPrecedure
    .input(
      z.object({
        licenseFileId: z.number().min(1),
        pageIndex: z.number().default(0),
        pageSize: z.number().default(10),
        filters: z.object({
          search: z.string(),
          licenseFileStatus: z.array(z.string()),
        }),
      }),
    )
    .query(async ({ input, ctx }) => {
      const filtersObj = getWhereObjFromFilters(input.filters);

      const [licenseFilePayments, totalLicenseFilePayments] = await Promise.all([
        ctx.prisma.payment.findMany({
          where: {
            cashFund: {
              clerkOrgId: ctx.orgId,
            },
            licenseFileId: input.licenseFileId,
            ...filtersObj,
          },
          select: {
            id: true,
            sum: true,
            comment: true,
            createdBy: {
              select: {
                fullName: true,
              },
            },
            createdAt: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
          skip: input.pageIndex * input.pageSize,
          take: input.pageSize,
        }),
        ctx.prisma.payment.count({
          where: {
            cashFund: {
              clerkOrgId: ctx.orgId,
            },
            licenseFileId: input.licenseFileId,
            ...filtersObj,
          },
        }),
      ]);

      const formattedLicenseFilePayments: LicenseFilePayment[] = licenseFilePayments.map((payment) => {
        return {
          id: payment.id,
          sum: payment.sum,
          comment: payment.comment,
          adminName: payment.createdBy.fullName,
          date: payment.createdAt,
        };
      });

      return {
        data: formattedLicenseFilePayments,
        pageCount: countPages(totalLicenseFilePayments, input.pageSize),
      };
    }),

  listByStudentId: orgAdminOnlyPrecedure
    .input(
      z.object({
        studentId: z.number(),
        pageIndex: z.number().default(0),
        pageSize: z.number().default(10),
        filters: z.object({
          search: z.string(),
          licenseFileStatus: z.array(z.string()),
        }),
      }),
    )
    .query(async ({ input, ctx }) => {
      const filtersObj = getWhereObjFromFilters(input.filters);

      const [studentPayments, totalStudentPayments] = await Promise.all([
        ctx.prisma.payment.findMany({
          where: {
            AND: [
              {
                cashFund: {
                  clerkOrgId: ctx.orgId,
                },
              },
              {
                OR: [
                  {
                    licenseFile: {
                      studentId: input.studentId,
                    },
                  },
                  {
                    lesson: {
                      studentId: input.studentId,
                    },
                  },
                  ...(filtersObj['OR'] ?? []),
                ],
              },
            ],
          },
          select: {
            id: true,
            sum: true,
            comment: true,
            createdBy: {
              select: {
                fullName: true,
              },
            },
            createdAt: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
          skip: input.pageIndex * input.pageSize,
          take: input.pageSize,
        }),
        ctx.prisma.payment.count({
          where: {
            AND: [
              {
                cashFund: {
                  clerkOrgId: ctx.orgId,
                },
              },
              {
                OR: [
                  {
                    licenseFile: {
                      studentId: input.studentId,
                    },
                  },
                  {
                    lesson: {
                      studentId: input.studentId,
                    },
                  },
                  ...(filtersObj['OR'] ?? []),
                ],
              },
            ],
          },
        }),
      ]);

      const formattedStudentPayments: StudentPayment[] = studentPayments.map((payment) => {
        return {
          id: payment.id,
          sum: payment.sum,
          comment: payment.comment,
          adminName: payment.createdBy.fullName,
          date: payment.createdAt,
        };
      });

      return {
        data: formattedStudentPayments,
        pageCount: countPages(totalStudentPayments, input.pageSize),
      };
    }),
});
