import { TRPCError } from '@trpc/server';

import { createTRPCRouter, orgAdminOnlyPrecedure } from '@/server/api/trpc';
import { lessonFormBackendInputSchema } from '@/base/schemas/lesson-form.schema';

export const mutationRouter = createTRPCRouter({
  add: orgAdminOnlyPrecedure.input(lessonFormBackendInputSchema).mutation(async ({ input, ctx }) => {
    const lesson = await ctx.prisma.lesson.create({
      data: {
        price: input.price,
        duration: input.duration,
        status: input.status,
        date: input.date,
        comment: `No comment`,
        grade: -1,

        ...(input.licenseFileId ? { licenseFile: { connect: { id: input.licenseFileId } } } : {}),

        payment: {
          create: {
            sum: input.price,
            comment: `Leçon de conduite`,
            date: new Date(),

            cashFund: {
              connect: {
                clerkOrgId: ctx.orgId,
              },
            },

            createdBy: {
              connect: {
                clerkId: ctx.userId,
              },
            },
          },
        },

        instructor: {
          connect: {
            id: input.instructorId,
          },
        },

        student: {
          connect: {
            id: input.studentId,
          },
        },

        createdBy: {
          connect: {
            clerkId: ctx.userId,
          },
        },
      },
    });

    if (!lesson) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });

    return { lessonId: lesson.id };
  }),
});
