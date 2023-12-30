import { createTRPCRouter, orgAdminOnlyPrecedure } from '@/server/api/trpc';
import { licenseFileBackendInputSchema } from '@/schemas/license-file-form-schema';

export const mutationRouter = createTRPCRouter({
  add: orgAdminOnlyPrecedure.input(licenseFileBackendInputSchema).mutation(async ({ input, ctx }) => {
    const licenseFile = await ctx.prisma.licenseFile.create({
      data: {
        price: input.price,
        category: input.category,
        status: input.status,
        createdBy: {
          connect: {
            clerkId: ctx.userId,
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
      },
    });

    return {
      newLicenseFileId: licenseFile.id,
    };
  }),
});
