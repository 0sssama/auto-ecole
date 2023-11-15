import { createTRPCRouter, orgAdminOnlyPrecedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { getWhereObjFromFilters } from "./utils";
import { countPages } from "@/utils/countPages";

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
      if (!ctx.orgId)
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
            id: "asc",
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
