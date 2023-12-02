import { licenseFilePaymentBackendInputSchema } from "@/schemas/license-file-payment-form-schema";
import { createTRPCRouter, orgAdminOnlyPrecedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const mutationRouter = createTRPCRouter({
  addToLicenseFile: orgAdminOnlyPrecedure
    .input(licenseFilePaymentBackendInputSchema)
    .mutation(async ({ ctx, input }) => {
      if (!ctx.orgId || !ctx.userId)
        throw new TRPCError({ code: "UNAUTHORIZED" });

      const payment = await ctx.prisma.payment.create({
        data: {
          sum: input.sum,
          comment: input.comment,
          date: input.date,

          licenseFile: {
            connect: {
              id: input.licenseFileId,
            },
          },

          createdBy: {
            connect: { clerkId: ctx.userId },
          },
        },
      });

      if (!payment) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      return { id: payment.id };
    }),
});
