import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { createTRPCRouter, orgAdminOnlyPrecedure } from "@/server/api/trpc";
import { countPages } from "@/utils/countPages";

import { getWhereObjFromFilters } from "./utils";
import type { Payment } from "@/components/sections/payments/list-table/schema";
import type { StudentPayment } from "@/components/sections/students/student-file/payments-table/schema";

export const queryRouter = createTRPCRouter({
  list: orgAdminOnlyPrecedure
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
      if (!ctx.userId || !ctx.orgId)
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });

      const filtersObj = getWhereObjFromFilters(input.filters);

      const [payments, totalPayments] = await Promise.all([
        ctx.prisma.payment.findMany({
          where: {
            createdBy: {
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
            createdAt: "desc",
          },
          skip: input.pageIndex * input.pageSize,
          take: input.pageSize,
        }),
        ctx.prisma.payment.count({
          where: {
            createdBy: {
              clerkOrgId: ctx.orgId,
            },
            ...filtersObj,
          },
        }),
      ]);

      const formattedPayments: Payment[] = payments.map((payment) => ({
        id: payment.id,
        sum: payment.sum,
        comment: payment.comment,
        adminName: payment.createdBy.fullName,
        date: payment.createdAt,
      }));

      return {
        data: formattedPayments,
        pageCount: countPages(totalPayments, input.pageSize),
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
        }),
      }),
    )
    .query(async ({ input, ctx }) => {
      if (!ctx.userId || !ctx.orgId)
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });

      const filtersObj = getWhereObjFromFilters(input.filters);

      const [studentPayments, totalStudentPayments] = await Promise.all([
        ctx.prisma.payment.findMany({
          where: {
            AND: [
              {
                licenseFile: {
                  customer: {
                    clerkOrgId: ctx.orgId,
                  },
                },
              },
              {
                OR: [
                  {
                    licenseFile: {
                      customerId: input.studentId,
                    },
                  },
                  {
                    lessons: {
                      some: {
                        customerId: input.studentId,
                      },
                    },
                  },
                  ...(filtersObj["OR"] ?? []),
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
            createdAt: "desc",
          },
          skip: input.pageIndex * input.pageSize,
          take: input.pageSize,
        }),
        ctx.prisma.payment.count({
          where: {
            AND: [
              {
                licenseFile: {
                  customer: {
                    clerkOrgId: ctx.orgId,
                  },
                },
              },
              {
                OR: [
                  {
                    licenseFile: {
                      customerId: input.studentId,
                    },
                  },
                  {
                    lessons: {
                      some: {
                        customerId: input.studentId,
                      },
                    },
                  },
                  ...(filtersObj["OR"] ?? []),
                ],
              },
            ],
          },
        }),
      ]);

      const formattedStudentPayments: StudentPayment[] = studentPayments.map(
        (payment) => ({
          id: payment.id,
          sum: payment.sum,
          comment: payment.comment,
          adminName: payment.createdBy.fullName,
          date: payment.createdAt,
        }),
      );

      return {
        data: formattedStudentPayments,
        pageCount: countPages(totalStudentPayments, input.pageSize),
      };
    }),
});
