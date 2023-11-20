import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { createTRPCRouter, orgAdminOnlyPrecedure } from "@/server/api/trpc";
import { getWhereObjFromFilters } from "./utils";
import { countPages } from "@/utils/countPages";

import type { Exam } from "@/components/sections/exams/list-table/schema";
import type { LicenseFileExam } from "@/components/sections/license-files/license-file/exams-table/schema";

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

      const [exams, totalExams] = await Promise.all([
        ctx.prisma.exam.findMany({
          where: {
            ...filtersObj,
            licenseFile: {
              customer: {
                clerkOrgId: ctx.orgId,
              },
            },
          },
          select: {
            id: true,
            status: true,
            type: true,
            date: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: input.pageSize,
          skip: input.pageIndex * input.pageSize,
        }),
        ctx.prisma.exam.count({
          where: {
            ...filtersObj,
            licenseFile: {
              customer: {
                clerkOrgId: ctx.orgId,
              },
            },
          },
        }),
      ]);

      const formattedExams: Exam[] = exams;

      return {
        data: formattedExams,
        pageCount: countPages(totalExams, input.pageSize),
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
        }),
      }),
    )
    .query(async ({ input, ctx }) => {
      if (!ctx.userId || !ctx.orgId)
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });

      const filtersObj = getWhereObjFromFilters(input.filters);

      const [licenseFileExams, totalLicenseFileExams] = await Promise.all([
        ctx.prisma.exam.findMany({
          where: {
            ...filtersObj,
            licenseFileId: input.licenseFileId,
            licenseFile: {
              customer: {
                clerkOrgId: ctx.orgId,
              },
            },
          },
          select: {
            id: true,
            status: true,
            type: true,
            date: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: input.pageSize,
          skip: input.pageIndex * input.pageSize,
        }),
        ctx.prisma.exam.count({
          where: {
            ...filtersObj,
            licenseFileId: input.licenseFileId,
            licenseFile: {
              customer: {
                clerkOrgId: ctx.orgId,
              },
            },
          },
        }),
      ]);

      const formattedLicenseFileExams: LicenseFileExam[] = licenseFileExams;

      return {
        data: formattedLicenseFileExams,
        pageCount: countPages(totalLicenseFileExams, input.pageSize),
      };
    }),
});
