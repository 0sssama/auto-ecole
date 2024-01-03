import { z } from 'zod';

import { createTRPCRouter, orgAdminOnlyPrecedure } from '@/server/api/trpc';
import { studentFormSchema } from '@/base/schemas/student-form-schema';

export const mutationRouter = createTRPCRouter({
  add: orgAdminOnlyPrecedure
    .input(
      z.object({
        clerkId: z.string(),
        ...studentFormSchema.shape,
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.prisma.student.create({
        data: {
          clerkUserId: input.clerkId,
          clerkOrgId: ctx.orgId,

          firstNameFr: input.firstNameFr,
          firstNameAr: input.firstNameAr,

          lastNameFr: input.lastNameFr,
          lastNameAr: input.lastNameAr,

          addressFr: input.addressFr,
          addressAr: input.addressAr,

          professionAr: input.professionAr,
          professionFr: input.professionFr,

          birthplaceFr: input.birthplaceFr,
          birthplaceAr: input.birthplaceAr,

          email: input.email,
          phone: input.phone,
          cin: input.cin,
          birthdate: input.birthdate,

          cinFile: input.cinFile,
          profilePicture: input.profilePicture,

          createdBy: {
            connect: {
              clerkId: ctx.userId,
            },
          },

          school: {
            connect: {
              clerkOrgId: ctx.orgId,
            },
          },
        },
      });

      return {
        newUserId: user.id,
        newUserClerkId: user.clerkUserId,
      };
    }),
  dearchive: orgAdminOnlyPrecedure.input(z.object({ studentId: z.number() })).mutation(async ({ input, ctx }) => {
    await ctx.prisma.student.update({
      where: {
        id: input.studentId,
        clerkOrgId: ctx.orgId,
      },
      data: {
        archived: false,
      },
    });

    return true;
  }),
  archive: orgAdminOnlyPrecedure.input(z.object({ studentId: z.number() })).mutation(async ({ input, ctx }) => {
    await ctx.prisma.student.update({
      where: {
        id: input.studentId,
        clerkOrgId: ctx.orgId,
      },
      data: {
        archived: true,
      },
    });

    return true;
  }),
  delete: orgAdminOnlyPrecedure.input(z.object({ studentId: z.number() })).mutation(async ({ input, ctx }) => {
    const result = await ctx.prisma.student.delete({
      where: {
        id: input.studentId,
        clerkOrgId: ctx.orgId,
      },
      select: {
        clerkUserId: true,
      },
    });

    return {
      clerkUserId: result.clerkUserId,
    };
  }),
});
