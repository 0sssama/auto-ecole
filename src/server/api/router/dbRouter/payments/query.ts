import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { createTRPCRouter, orgAdminOnlyPrecedure } from "@/server/api/trpc";
import { getWhereObjFromFilters } from "./utils";
import { countPages } from "@/utils/countPages";

export const queryRouter = createTRPCRouter({
  list: orgAdminOnlyPrecedure
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
      if (!ctx.orgId)
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

      const formattedStudentPayments = studentPayments.map((payment) => ({
        id: payment.id,
        sum: payment.sum,
        comment: payment.comment,
        adminName: payment.createdBy.fullName,
        date: payment.createdAt,
      }));

      return {
        data: formattedStudentPayments,
        pageCount: countPages(totalStudentPayments, input.pageSize),
      };
    }),
});
