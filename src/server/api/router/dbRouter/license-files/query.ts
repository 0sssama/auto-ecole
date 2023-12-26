import { z } from "zod";

import { createTRPCRouter, orgAdminOnlyPrecedure } from "@/server/api/trpc";
import { countPages } from "@/utils/countPages";
import type { InstructorLicenseFile } from "@/components/sections/instructors/instructor-file/license-files-table/schema";
import type { StudentLicenseFile } from "@/components/sections/students/student-file/license-files-table/schema";
import type { LicenseFile } from "@/components/sections/license-files/list-table/schema";

import { getWhereObjFromFilters } from "./utils";

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

      const [studentLicenseFiles, totalStudentLicenseFiles] = await Promise.all(
        [
          ctx.prisma.licenseFile.findMany({
            where: {
              ...filtersObj,
              student: {
                clerkOrgId: ctx.orgId,
              },
            },
            select: {
              id: true,
              status: true,
              category: true,
              price: true,
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
              createdAt: "desc",
            },
            skip: input.pageIndex * input.pageSize,
            take: input.pageSize,
          }),
          ctx.prisma.licenseFile.count({
            where: {
              ...filtersObj,
              student: {
                clerkOrgId: ctx.orgId,
              },
            },
          }),
        ],
      );

      const formattedStudentLicenseFiles: LicenseFile[] =
        studentLicenseFiles.map((licenseFile) => ({
          id: licenseFile.id,
          instructor: {
            id: licenseFile.instructor.id,
            name: `${licenseFile.instructor.firstName} ${licenseFile.instructor.lastName}`,
          },
          student: {
            id: licenseFile.student.id,
            name: `${licenseFile.student.firstNameFr} ${licenseFile.student.lastNameFr}`,
          },
          category: licenseFile.category,
          price: licenseFile.price,
          status: licenseFile.status,
        }));

      return {
        data: formattedStudentLicenseFiles,
        pageCount: countPages(totalStudentLicenseFiles, input.pageSize),
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

      const [studentLicenseFiles, totalStudentLicenseFiles] = await Promise.all(
        [
          ctx.prisma.licenseFile.findMany({
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
              category: true,
              price: true,
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
          ctx.prisma.licenseFile.count({
            where: {
              ...filtersObj,
              studentId: input.studentId,
              student: {
                clerkOrgId: ctx.orgId,
              },
            },
          }),
        ],
      );

      const formattedStudentLicenseFiles: StudentLicenseFile[] =
        studentLicenseFiles.map((licenseFile) => ({
          id: licenseFile.id,
          instructorId: licenseFile.instructor.id,
          instructorName: `${licenseFile.instructor.firstName} ${licenseFile.instructor.lastName}`,
          category: licenseFile.category,
          price: licenseFile.price,
          status: licenseFile.status,
          createdAt: licenseFile.createdAt,
        }));

      return {
        data: formattedStudentLicenseFiles,
        pageCount: countPages(totalStudentLicenseFiles, input.pageSize),
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

      const [instructorLicenseFiles, totalInstructorLicenseFiles] =
        await Promise.all([
          ctx.prisma.licenseFile.findMany({
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
              category: true,
              price: true,
              student: {
                select: {
                  id: true,
                  firstNameFr: true,
                  lastNameFr: true,
                },
              },
            },
            orderBy: {
              createdAt: "desc",
            },
            skip: input.pageIndex * input.pageSize,
            take: input.pageSize,
          }),
          ctx.prisma.licenseFile.count({
            where: {
              ...filtersObj,
              instructorId: input.instructorId,
              student: {
                clerkOrgId: ctx.orgId,
              },
            },
          }),
        ]);

      const formattedInstructorLicenseFiles: InstructorLicenseFile[] =
        instructorLicenseFiles.map((licenseFile) => ({
          id: licenseFile.id,
          studentId: licenseFile.student.id,
          studentName: `${licenseFile.student.firstNameFr} ${licenseFile.student.lastNameFr}`,
          category: licenseFile.category,
          price: licenseFile.price,
          status: licenseFile.status,
          createdAt: licenseFile.createdAt,
        }));

      return {
        data: formattedInstructorLicenseFiles,
        pageCount: countPages(totalInstructorLicenseFiles, input.pageSize),
      };
    }),
});
