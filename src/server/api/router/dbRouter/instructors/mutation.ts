import { z } from 'zod';

import { createTRPCRouter, orgAdminOnlyPrecedure } from '@/server/api/trpc';
import { instructorFormSchema } from '@/base/schemas/instructor-form-schema';
import { createNewCredentials } from '@/base/utils/client/create-new-credentials';

export const mutationRouter = createTRPCRouter({
  add: orgAdminOnlyPrecedure
    .input(
      z.object({
        clerkId: z.string(),
        ...instructorFormSchema.shape,
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const credentials = createNewCredentials({
        firstName: input.firstName,
        lastName: input.lastName,
        phoneNumber: input.phone,
        isInstructor: true,
      });

      const user = await ctx.prisma.instructor.create({
        data: {
          firstName: input.firstName,
          lastName: input.lastName,
          phone: input.phone,

          school: {
            connect: {
              clerkOrgId: ctx.orgId,
            },
          },

          account: {
            create: {
              username: credentials.username,
              fullName: `${input.firstName} ${input.lastName}`,
              rank: 'INSTRUCTOR',
              clerkId: input.clerkId,
              clerkOrgId: ctx.orgId,

              school: {
                connect: {
                  clerkOrgId: ctx.orgId,
                },
              },
            },
          },
        },
      });

      return {
        newUserId: user.id,
        newUserClerkId: user.accountId,
      };
    }),
});
