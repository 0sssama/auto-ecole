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

      const [studentLicenseFiles, totalStudentLicenseFiles] = await Promise.all(
        [
          ctx.prisma.licenseFile.findMany({
            where: {
              customerId: input.studentId,
              ...filtersObj,
            },
            select: {
              id: true,
              status: true,
              createdAt: true,
              category: true,
            },
            skip: input.pageIndex * input.pageSize,
            take: input.pageSize,
          }),
          ctx.prisma.licenseFile.count({
            where: {
              customerId: input.studentId,
              ...filtersObj,
            },
          }),
        ],
      );

      return {
        data: studentLicenseFiles,
        pageCount: countPages(totalStudentLicenseFiles, input.pageSize),
      };
    }),
});
