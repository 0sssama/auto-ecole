import { z } from "zod";
import { clerkClient } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";

import { createTRPCRouter, orgAdminOnlyPrecedure } from "@/server/api/trpc";
import { ClientFormSchema } from "@/schemas/client-form-schema";

export const usersRouter = createTRPCRouter({
  add: orgAdminOnlyPrecedure
    .input(
      z.object({
        firstName: ClientFormSchema.shape.firstNameFr,
        lastName: ClientFormSchema.shape.lastNameFr,
        emailAddress: ClientFormSchema.shape.email,
        phoneNumber: ClientFormSchema.shape.phone,
        cin: ClientFormSchema.shape.cin,
      }),
    )
    .mutation(async ({ input, ctx }) => {
      if (!ctx.orgId)
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });

      const user = await clerkClient.users.createUser({
        firstName: input.firstName,
        lastName: input.lastName,
        username: `${input.lastName.toLowerCase()}_${input.phoneNumber.toLowerCase()}`,
        password: `${input.lastName.toLowerCase()}@${input.cin.toLowerCase()}`,
        skipPasswordChecks: true,
        skipPasswordRequirement: true,
      });

      try {
        await clerkClient.organizations.createOrganizationMembership({
          organizationId: ctx.orgId,
          userId: user.id,
          role: "basic_member",
        });
      } catch (err) {
        console.error(err);
        console.log("CLEANING UP USER, FAILURE TO ADD USER TO ORGANIZATION");
        // cleanup user that was created
        await clerkClient.users.deleteUser(user.id);

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
        });
      }

      return {
        clerkId: user.id,
      };
    }),
  delete: orgAdminOnlyPrecedure
    .input(
      z.object({
        clerkId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      await clerkClient.users.deleteUser(input.clerkId);

      return {
        clerkId: input.clerkId,
      };
    }),
});
