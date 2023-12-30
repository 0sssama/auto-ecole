import { z } from 'zod';

import { createTRPCRouter, orgAdminOnlyPrecedure } from '@/server/api/trpc';
import { countPages } from '@/utils/count-pages';
import type { Lesson } from '@/components/sections/lessons/list-table/schema';
import type { InstructorLesson } from '@/components/sections/instructors/instructor-file/lessons-table/schema';
import type { StudentLesson } from '@/components/sections/students/student-file/lessons-table/schema';
import type { LicenseFileLesson } from '@/components/sections/license-files/license-file/lessons-table/schema';

import { getWhereObjFromFilters } from './utils';

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
      const filtersObj = getWhereObjFromFilters(input.filters);

      const [lessons, totalLessons] = await Promise.all([
        ctx.prisma.lesson.findMany({
          where: {
            ...filtersObj,
            student: {
              clerkOrgId: ctx.orgId,
            },
          },
          select: {
            id: true,
            status: true,
            price: true,
            duration: true,
            date: true,
            instructor: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
            student: {
              select: {
                id: true,
                firstNameFr: true,
                lastNameFr: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
          skip: input.pageIndex * input.pageSize,
          take: input.pageSize,
        }),
        ctx.prisma.lesson.count({
          where: {
            ...filtersObj,
            student: {
              clerkOrgId: ctx.orgId,
            },
          },
        }),
      ]);

      const formattedLessons: Lesson[] = lessons.map((lesson) => {
        return {
          id: lesson.id,
          instructor: {
            id: lesson.instructor.id,
            fullName: `${lesson.instructor.firstName} ${lesson.instructor.lastName}`,
          },
          student: {
            id: lesson.student.id,
            fullName: `${lesson.student.firstNameFr} ${lesson.student.lastNameFr}`,
          },
          status: lesson.status,
          price: lesson.price,
          duration: lesson.duration,
          scheduledDate: lesson.date,
        };
      });

      return {
        data: formattedLessons,
        pageCount: countPages(totalLessons, input.pageSize),
      };
    }),

  listByStudentId: orgAdminOnlyPrecedure
    .input(
      z.object({
        studentId: z.number().min(1),
        pageIndex: z.number().default(0),
        pageSize: z.number().default(10),
        filters: z.object({
          search: z.string(),
        }),
      }),
    )
    .query(async ({ input, ctx }) => {
      const filtersObj = getWhereObjFromFilters(input.filters);

      const [studentLessons, totalStudentLessons] = await Promise.all([
        ctx.prisma.lesson.findMany({
          where: {
            ...filtersObj,
            studentId: input.studentId,
            student: {
              clerkOrgId: ctx.orgId,
            },
          },
          select: {
            id: true,
            status: true,
            createdAt: true,
            price: true,
            comment: true,
            duration: true,
            date: true,
            grade: true,
            instructor: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
          skip: input.pageIndex * input.pageSize,
          take: input.pageSize,
        }),
        ctx.prisma.lesson.count({
          where: {
            ...filtersObj,
            studentId: input.studentId,
            student: {
              clerkOrgId: ctx.orgId,
            },
          },
        }),
      ]);

      const formattedStudentLessons: StudentLesson[] = studentLessons.map((lesson) => {
        return {
          id: lesson.id,
          instructorId: lesson.instructor.id,
          instructorName: `${lesson.instructor.firstName} ${lesson.instructor.lastName}`,
          status: lesson.status,
          comment: lesson.comment,
          grade: lesson.grade,
          price: lesson.price,
          duration: lesson.duration,
          scheduledDate: lesson.date,
        };
      });

      return {
        data: formattedStudentLessons,
        pageCount: countPages(totalStudentLessons, input.pageSize),
      };
    }),

  listByInstructorId: orgAdminOnlyPrecedure
    .input(
      z.object({
        instructorId: z.number().min(1),
        pageIndex: z.number().default(0),
        pageSize: z.number().default(10),
        filters: z.object({
          search: z.string(),
        }),
      }),
    )
    .query(async ({ input, ctx }) => {
      const filtersObj = getWhereObjFromFilters(input.filters);

      const [instructorLessons, totalInstructorLessons] = await Promise.all([
        ctx.prisma.lesson.findMany({
          where: {
            ...filtersObj,
            instructorId: input.instructorId,
            student: {
              clerkOrgId: ctx.orgId,
            },
          },
          select: {
            id: true,
            status: true,
            createdAt: true,
            price: true,
            comment: true,
            duration: true,
            date: true,
            grade: true,
            student: {
              select: {
                id: true,
                lastNameFr: true,
                firstNameFr: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
          skip: input.pageIndex * input.pageSize,
          take: input.pageSize,
        }),
        ctx.prisma.lesson.count({
          where: {
            ...filtersObj,
            instructorId: input.instructorId,
            student: {
              clerkOrgId: ctx.orgId,
            },
          },
        }),
      ]);

      const formattedInstructorLessons: InstructorLesson[] = instructorLessons.map((lesson) => {
        return {
          id: lesson.id,
          studentId: lesson.student.id,
          studentName: `${lesson.student.firstNameFr} ${lesson.student.lastNameFr}`,
          status: lesson.status,
          comment: lesson.comment,
          grade: lesson.grade,
          price: lesson.price,
          duration: lesson.duration,
          scheduledDate: lesson.date,
        };
      });

      return {
        data: formattedInstructorLessons,
        pageCount: countPages(totalInstructorLessons, input.pageSize),
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
      const filtersObj = getWhereObjFromFilters(input.filters);

      const [licenseFileLessons, totalLicenseFileLessons] = await Promise.all([
        ctx.prisma.lesson.findMany({
          where: {
            ...filtersObj,
            licenseFileId: input.licenseFileId,
            student: {
              clerkOrgId: ctx.orgId,
            },
          },
          select: {
            id: true,
            status: true,
            createdAt: true,
            price: true,
            comment: true,
            duration: true,
            date: true,
            grade: true,
            student: {
              select: {
                id: true,
                lastNameFr: true,
                firstNameFr: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
          skip: input.pageIndex * input.pageSize,
          take: input.pageSize,
        }),
        ctx.prisma.lesson.count({
          where: {
            ...filtersObj,
            licenseFileId: input.licenseFileId,
            student: {
              clerkOrgId: ctx.orgId,
            },
          },
        }),
      ]);

      const formattedLicenseFileLessons: LicenseFileLesson[] = licenseFileLessons.map((lesson) => {
        return {
          id: lesson.id,
          status: lesson.status,
          comment: lesson.comment,
          grade: lesson.grade,
          price: lesson.price,
          duration: lesson.duration,
          scheduledDate: lesson.date,
        };
      });

      return {
        data: formattedLicenseFileLessons,
        pageCount: countPages(totalLicenseFileLessons, input.pageSize),
      };
    }),
});
