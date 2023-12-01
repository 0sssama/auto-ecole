import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { createTRPCRouter, orgAdminOnlyPrecedure } from "@/server/api/trpc";
import { countPages } from "@/utils/countPages";

import { getWhereObjFromFilters } from "./utils";

export const queryRouter = createTRPCRouter({
  getManyForSelect: orgAdminOnlyPrecedure
    .input(
      z.object({
        searchQuery: z.string().optional(),
        count: z.number().optional(),
      }),
    )
    .query(async ({ input, ctx }) => {
      if (!ctx.userId || !ctx.orgId)
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });

      const filtersObj = input.searchQuery
        ? getWhereObjFromFilters({
            search: input.searchQuery,
          })
        : {};

      const instructors = await ctx.prisma.instructor.findMany({
        where: {
          ...filtersObj,
          account: {
            clerkOrgId: ctx.orgId,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
        take: input.count,
      });

      return instructors.map((instructor) => ({
        value: String(instructor.id),
        label: `${instructor.firstName} ${instructor.lastName}`,
      }));
    }),

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
      if (!ctx.orgId || !ctx.userId)
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });

      const filtersObj = getWhereObjFromFilters(input.filters);

      const [instructors, totalInstructors] = await Promise.all([
        ctx.prisma.instructor.findMany({
          where: {
            ...filtersObj,
            account: {
              clerkOrgId: ctx.orgId,
            },
          },
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phone: true,
            createdAt: true,
            licenseFiles: {
              select: {
                id: true,
              },
            },
            lessons: {
              select: {
                id: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          skip: input.pageIndex * input.pageSize,
          take: input.pageSize,
        }),
        ctx.prisma.instructor.count({
          where: {
            ...filtersObj,
            account: {
              clerkOrgId: ctx.orgId,
            },
          },
        }),
      ]);

      const formattedCustomers = instructors.map((instructor) => ({
        id: instructor.id,
        fullName: `${instructor.firstName} ${instructor.lastName}`,
        phone: instructor.phone,
        licenseFilesCount: instructor.licenseFiles.length,
        lessonsCount: instructor.lessons.length,
        createdAt: instructor.createdAt,
      }));

      return {
        data: formattedCustomers,
        pageCount: countPages(totalInstructors, input.pageSize),
      };
    }),
});
