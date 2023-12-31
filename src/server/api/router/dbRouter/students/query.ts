import { z } from 'zod';

import { createTRPCRouter, orgAdminOnlyPrecedure } from '@/server/api/trpc';
import { countPages } from '@/base/utils/client/count-pages';
import type { Student } from '@/components/sections/students/list-table/schema';

import { getStudentCategoryFromLicenseFiles, getStudentStatusFromLicenseFiles, getWhereObjFromFilters } from './utils';

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

      const students = await ctx.prisma.student.findMany({
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
          createdAt: 'desc',
        },
        take: input.count,
      });

      return students.map((student) => {
        return {
          value: String(student.id),
          label: `${student.firstNameFr} ${student.lastNameFr}`,
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

      const [students, totalStudents] = await Promise.all([
        ctx.prisma.student.findMany({
          where: {
            ...filtersObj,
            clerkOrgId: ctx.orgId,
            archived: false,
          },
          select: {
            id: true,
            firstNameFr: true,
            lastNameFr: true,
            archived: true,
            profilePicture: true,
            cin: true,
            licenseFiles: {
              select: {
                status: true,
                category: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
          skip: input.pageIndex * input.pageSize,
          take: input.pageSize,
        }),
        ctx.prisma.student.count({
          where: {
            ...filtersObj,
            clerkOrgId: ctx.orgId,
          },
        }),
      ]);

      const formattedStudents: Student[] = students.map((student) => {
        return {
          id: student.id,
          name: `${student.firstNameFr} ${student.lastNameFr}`,
          archived: student.archived,
          profilePicture: student.profilePicture,
          cin: student.cin,
          status: getStudentStatusFromLicenseFiles(student.licenseFiles),
          category: getStudentCategoryFromLicenseFiles(student.licenseFiles),
        };
      });

      return {
        data: formattedStudents,
        pageCount: countPages(totalStudents, input.pageSize),
      };
    }),
});
