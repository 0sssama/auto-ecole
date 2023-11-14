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

      const [studentLessons, totalStudentLessons] = await Promise.all([
        ctx.prisma.lesson.findMany({
          where: {
            customerId: input.studentId,
            ...filtersObj,
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
            moniteur: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
          skip: input.pageIndex * input.pageSize,
          take: input.pageSize,
        }),
        ctx.prisma.lesson.count({
          where: {
            customerId: input.studentId,
            ...filtersObj,
          },
        }),
      ]);

      const formattedLessons = studentLessons.map((lesson) => ({
        id: lesson.id,
        monitorName: `${lesson.moniteur.firstName} ${lesson.moniteur.lastName}`,
        status: lesson.status,
        comment: lesson.comment,
        grade: lesson.grade,
        price: lesson.price,
        duration: lesson.duration,
        scheduledDate: lesson.date,
      }));

      return {
        data: formattedLessons,
        pageCount: countPages(totalStudentLessons, input.pageSize),
      };
    }),
});
