import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { createTRPCRouter, orgAdminOnlyPrecedure } from "@/server/api/trpc";
import { getWhereObjFromFilters } from "./utils";
import { countPages } from "@/utils/countPages";

import type { InstructorLicenseFile } from "@/components/sections/instructor-file/license-files-table/schema";
import type { StudentLicenseFile } from "@/components/sections/student-file/license-file-table/schema";
import type { LicenseFile } from "@/components/sections/license-files/list-table/schema";

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

      const [studentLicenseFiles, totalStudentLicenseFiles] = await Promise.all(
        [
          ctx.prisma.licenseFile.findMany({
            where: {
              ...filtersObj,
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
              customer: {
                select: {
                  id: true,
                  firstNameFr: true,
                  lastNameFr: true,
                },
              },
            },
            skip: input.pageIndex * input.pageSize,
            take: input.pageSize,
          }),
          ctx.prisma.licenseFile.count({
            where: {
              ...filtersObj,
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
            id: licenseFile.customer.id,
            name: `${licenseFile.customer.firstNameFr} ${licenseFile.customer.lastNameFr}`,
          },
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

  listByStudentId: orgAdminOnlyPrecedure
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
              price: true,
              instructor: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                },
              },
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
        instructorId: z.number(),

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

      const [instructorLicenseFiles, totalInstructorLicenseFiles] =
        await Promise.all([
          ctx.prisma.licenseFile.findMany({
            where: {
              instructorId: input.instructorId,
              ...filtersObj,
            },
            select: {
              id: true,
              status: true,
              createdAt: true,
              category: true,
              price: true,
              customer: {
                select: {
                  id: true,
                  firstNameFr: true,
                  lastNameFr: true,
                },
              },
            },
            skip: input.pageIndex * input.pageSize,
            take: input.pageSize,
          }),
          ctx.prisma.licenseFile.count({
            where: {
              instructorId: input.instructorId,
              ...filtersObj,
            },
          }),
        ]);

      const formattedInstructorLicenseFiles: InstructorLicenseFile[] =
        instructorLicenseFiles.map((licenseFile) => ({
          id: licenseFile.id,
          studentId: licenseFile.customer.id,
          studentName: `${licenseFile.customer.firstNameFr} ${licenseFile.customer.lastNameFr}`,
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
