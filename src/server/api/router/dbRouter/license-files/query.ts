import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { createTRPCRouter, orgAdminOnlyPrecedure } from "@/server/api/trpc";
import { getWhereObjFromFilters } from "./utils";
import { countPages } from "@/utils/countPages";
import { InstructorLicenseFile } from "@/components/sections/instructor-file/license-files-table/schema";

export const queryRouter = createTRPCRouter({
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
