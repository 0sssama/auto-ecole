import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { createTRPCRouter, orgAdminOnlyPrecedure } from "@/server/api/trpc";
import { getWhereObjFromFilters } from "./utils";
import { countPages } from "@/utils/countPages";

export const queryRouter = createTRPCRouter({
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

      const [exams, examsCount] = await Promise.all([
        ctx.prisma.exam.findMany({
          where: {
            licenseFileId: input.licenseFileId,
            ...filtersObj,
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
            licenseFileId: input.licenseFileId,
            ...filtersObj,
          },
        }),
      ]);

      return {
        data: exams,
        pageCount: countPages(examsCount, input.pageSize),
      };
    }),
});
