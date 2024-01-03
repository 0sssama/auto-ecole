import { z } from 'zod';

import { createTRPCRouter, orgAdminOnlyPrecedure } from '@/server/api/trpc';
import { countPages } from '@/base/utils/client/count-pages';
import type { Instructor } from '@/components/sections/instructors/list-table/schema';

import { getWhereObjFromFilters } from './utils';

export const queryRouter = createTRPCRouter({
  getManyForSelect: orgAdminOnlyPrecedure
    .input(
      z.object({
        searchQuery: z.string().optional(),
        count: z.number().optional(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const filtersObj = input.searchQuery
        ? getWhereObjFromFilters({
            search: input.searchQuery,
          })
        : {};

      const instructors = await ctx.prisma.instructor.findMany({
        where: {
          ...filtersObj,
          school: {
            clerkOrgId: ctx.orgId,
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
        take: input.count,
      });

      return instructors.map((instructor) => {
        return {
          value: String(instructor.id),
          label: `${instructor.firstName} ${instructor.lastName}`,
        };
      });
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
      const filtersObj = getWhereObjFromFilters(input.filters);

      const [instructors, totalInstructors] = await Promise.all([
        ctx.prisma.instructor.findMany({
          where: {
            ...filtersObj,
            school: {
              clerkOrgId: ctx.orgId,
            },
          },
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phone: true,
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
            createdAt: 'desc',
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

      const formattedInstructors: Instructor[] = instructors.map((instructor) => {
        return {
          id: instructor.id,
          fullName: `${instructor.firstName} ${instructor.lastName}`,
          phone: instructor.phone,
          licenseFilesCount: instructor.licenseFiles.length,
          lessonsCount: instructor.lessons.length,
        };
      });

      return {
        data: formattedInstructors,
        pageCount: countPages(totalInstructors, input.pageSize),
      };
    }),
});
