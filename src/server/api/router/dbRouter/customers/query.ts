import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { createTRPCRouter, orgAdminOnlyPrecedure } from "@/server/api/trpc";
import { joinedInLastWeek } from "@/utils/joinedInLastWeek";
import { getUserStatusFromLicenseFiles, getWhereObjFromFilters } from "./utils";
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

      const [users, totalCustomers] = await Promise.all([
        ctx.prisma.customer.findMany({
          where: {
            clerkOrgId: ctx.orgId,
            ...filtersObj,
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
            archived: "asc",
          },
          skip: input.pageIndex * input.pageSize,
          take: input.pageSize,
        }),
        ctx.prisma.customer.count({
          where: {
            clerkOrgId: ctx.orgId,
            ...filtersObj,
          },
        }),
      ]);

      const formattedCustomers = users.map((user) => ({
        id: user.id,
        name: `${user.firstNameFr} ${user.lastNameFr}`,
        createdAt: user.createdAt,
        archived: user.archived,
        isNew: joinedInLastWeek(user.createdAt),
        status:
          user.licenseFiles.length === 0
            ? "not-started"
            : getUserStatusFromLicenseFiles(user.licenseFiles),
      }));

      return {
        data: formattedCustomers,
        pageCount: countPages(totalCustomers, input.pageSize),
      };
    }),
});
