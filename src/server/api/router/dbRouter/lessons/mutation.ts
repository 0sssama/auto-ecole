import { lessonFormBackendInputSchema } from "@/schemas/lesson-form-schema";
import { createTRPCRouter, orgAdminOnlyPrecedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const mutationRouter = createTRPCRouter({
  add: orgAdminOnlyPrecedure
    .input(lessonFormBackendInputSchema)
    .mutation(async ({ input, ctx }) => {
      if (!ctx.userId || !ctx.orgId)
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });

      const lesson = await ctx.prisma.lesson.create({
        data: {
          price: input.price,
          duration: input.duration,
          status: input.status,
          date: input.date,
          comment: `No comment`,
          grade: -1,

          payment: {
            create: {
              sum: input.price,
              comment: `Leçon de conduite`,
              date: new Date(),

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

          customer: {
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

      if (!lesson) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      return { lessonId: lesson.id };
    }),
});
