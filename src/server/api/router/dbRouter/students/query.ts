import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { createTRPCRouter, orgAdminOnlyPrecedure } from "@/server/api/trpc";
import { joinedInLastWeek } from "@/utils/joinedInLastWeek";
import { getUserStatusFromLicenseFiles, getWhereObjFromFilters } from "./utils";
import { countPages } from "@/utils/countPages";

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

      const students = await ctx.prisma.customer.findMany({
        where: {
          ...filtersObj,
          clerkOrgId: ctx.orgId,
        },
        select: {
          id: true,
          firstNameFr: true,
          lastNameFr: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: input.count,
      });

      return students.map((student) => ({
        value: String(student.id),
        label: `${student.firstNameFr} ${student.lastNameFr}`,
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
      if (!ctx.orgId)
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });

      const filtersObj = getWhereObjFromFilters(input.filters);

      const [students, totalStudents] = await Promise.all([
        ctx.prisma.customer.findMany({
          where: {
            ...filtersObj,
            clerkOrgId: ctx.orgId,
          },
          select: {
            id: true,
            firstNameFr: true,
            lastNameFr: true,
            createdAt: true,
            archived: true,
            licenseFiles: {
              select: {
                status: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          skip: input.pageIndex * input.pageSize,
          take: input.pageSize,
        }),
        ctx.prisma.customer.count({
          where: {
            ...filtersObj,
            clerkOrgId: ctx.orgId,
          },
        }),
      ]);

      const formattedStudents = students.map((student) => ({
        id: student.id,
        name: `${student.firstNameFr} ${student.lastNameFr}`,
        createdAt: student.createdAt,
        archived: student.archived,
        isNew: joinedInLastWeek(student.createdAt),
        status:
          student.licenseFiles.length === 0
            ? "not-started"
            : getUserStatusFromLicenseFiles(student.licenseFiles),
      }));

      return {
        data: formattedStudents,
        pageCount: countPages(totalStudents, input.pageSize),
      };
    }),
});
