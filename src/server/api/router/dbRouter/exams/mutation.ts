import { z } from 'zod';
import { TRPCError } from '@trpc/server';

import { createTRPCRouter, orgAdminOnlyPrecedure } from '@/server/api/trpc';
import { examBackendInputSchema } from '@/base/schemas/exam-form-schema';

export const mutationRouter = createTRPCRouter({
  addToLicenseFile: orgAdminOnlyPrecedure.input(examBackendInputSchema).mutation(async ({ ctx, input }) => {
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

    if (!newExam) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });

    return newExam;
  }),

  delete: orgAdminOnlyPrecedure
    .input(
      z.object({
        examId: z.number().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const deletedExam = await ctx.prisma.exam.delete({
        where: {
          id: input.examId,
        },
      });

      if (!deletedExam) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });

      return deletedExam;
    }),
});
