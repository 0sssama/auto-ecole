import { examBackendInputSchema } from "@/schemas/exam-form-schema";
import { createTRPCRouter, orgAdminOnlyPrecedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const mutationRouter = createTRPCRouter({
  addToLicenseFile: orgAdminOnlyPrecedure
    .input(examBackendInputSchema)
    .mutation(async ({ ctx, input }) => {
      if (!ctx.userId || !ctx.orgId)
        throw new TRPCError({ code: "UNAUTHORIZED" });

      const newExam = await ctx.prisma.exam.create({
        data: {
          type: input.type,
          status: input.status,
          date: input.date,
          licenseFile: {
            connect: {
              id: input.licenseFileId,
            },
          },
        },
        select: {
          id: true,
        },
      });

      if (!newExam) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      return newExam;
    }),

  delete: orgAdminOnlyPrecedure
    .input(
      z.object({
        examId: z.number().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.userId || !ctx.orgId)
        throw new TRPCError({ code: "UNAUTHORIZED" });

      const deletedExam = await ctx.prisma.exam.delete({
        where: {
          id: input.examId,
        },
      });

      if (!deletedExam) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      return deletedExam;
    }),
});
