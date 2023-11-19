import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { createTRPCRouter, orgAdminOnlyPrecedure } from "@/server/api/trpc";
import { getWhereObjFromFilters } from "./utils";
import { countPages } from "@/utils/countPages";

import type { InstructorLesson } from "@/components/sections/instructor-file/lessons-table/schema";
import type { StudentLesson } from "@/components/sections/student-file/lessons-table/schema";
import type { LicenseFileLesson } from "@/components/sections/license-files/license-file/lessons-table/schema";

export const queryRouter = createTRPCRouter({
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
      if (!ctx.orgId)
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });

      const filtersObj = getWhereObjFromFilters(input.filters);

      const [studentLessons, totalStudentLessons] = await Promise.all([
        ctx.prisma.lesson.findMany({
          where: {
            ...filtersObj,
            customerId: input.studentId,
            customer: {
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
            createdAt: "desc",
          },
          skip: input.pageIndex * input.pageSize,
          take: input.pageSize,
        }),
        ctx.prisma.lesson.count({
          where: {
            ...filtersObj,
            customerId: input.studentId,
            customer: {
              clerkOrgId: ctx.orgId,
            },
          },
        }),
      ]);

      const formattedStudentLessons: StudentLesson[] = studentLessons.map(
        (lesson) => ({
          id: lesson.id,
          instructorId: lesson.instructor.id,
          instructorName: `${lesson.instructor.firstName} ${lesson.instructor.lastName}`,
          status: lesson.status,
          comment: lesson.comment,
          grade: lesson.grade,
          price: lesson.price,
          duration: lesson.duration,
          scheduledDate: lesson.date,
        }),
      );

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
      if (!ctx.orgId)
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });

      const filtersObj = getWhereObjFromFilters(input.filters);

      const [instructorLessons, totalInstructorLessons] = await Promise.all([
        ctx.prisma.lesson.findMany({
          where: {
            ...filtersObj,
            instructorId: input.instructorId,
            customer: {
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
            customer: {
              select: {
                id: true,
                lastNameFr: true,
                firstNameFr: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          skip: input.pageIndex * input.pageSize,
          take: input.pageSize,
        }),
        ctx.prisma.lesson.count({
          where: {
            ...filtersObj,
            instructorId: input.instructorId,
            customer: {
              clerkOrgId: ctx.orgId,
            },
          },
        }),
      ]);

      const formattedInstructorLessons: InstructorLesson[] =
        instructorLessons.map((lesson) => ({
          id: lesson.id,
          studentId: lesson.customer.id,
          studentName: `${lesson.customer.firstNameFr} ${lesson.customer.lastNameFr}`,
          status: lesson.status,
          comment: lesson.comment,
          grade: lesson.grade,
          price: lesson.price,
          duration: lesson.duration,
          scheduledDate: lesson.date,
        }));

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
      if (!ctx.orgId)
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });

      const filtersObj = getWhereObjFromFilters(input.filters);

      const [licenseFileLessons, totalLicenseFileLessons] = await Promise.all([
        ctx.prisma.lesson.findMany({
          where: {
            ...filtersObj,
            licenseFileId: input.licenseFileId,
            customer: {
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
            customer: {
              select: {
                id: true,
                lastNameFr: true,
                firstNameFr: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          skip: input.pageIndex * input.pageSize,
          take: input.pageSize,
        }),
        ctx.prisma.lesson.count({
          where: {
            ...filtersObj,
            licenseFileId: input.licenseFileId,
            customer: {
              clerkOrgId: ctx.orgId,
            },
          },
        }),
      ]);

      const formattedLicenseFileLessons: LicenseFileLesson[] =
        licenseFileLessons.map((lesson) => ({
          id: lesson.id,
          status: lesson.status,
          comment: lesson.comment,
          grade: lesson.grade,
          price: lesson.price,
          duration: lesson.duration,
          scheduledDate: lesson.date,
        }));

      return {
        data: formattedLicenseFileLessons,
        pageCount: countPages(totalLicenseFileLessons, input.pageSize),
      };
    }),
});
