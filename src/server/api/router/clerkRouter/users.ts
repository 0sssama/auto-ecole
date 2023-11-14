import { z } from "zod";
import { clerkClient } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";

import { createTRPCRouter, orgAdminOnlyPrecedure } from "@/server/api/trpc";
import { ClientFormSchema } from "@/schemas/client-form-schema";

const mutationRouter = createTRPCRouter({
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
        username: `${input.lastName
          .toLowerCase()
          .replaceAll(" ", "_")}_${input.phoneNumber.toLowerCase()}`,
        password: `${input.lastName
          .toLowerCase()
          .replaceAll(" ", "_")}@${input.cin.toLowerCase()}`,
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
        clerkUserId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      await clerkClient.users.deleteUser(input.clerkUserId);

      return {
        clerkId: input.clerkUserId,
      };
    }),
});

const queryRouter = createTRPCRouter({
  list: orgAdminOnlyPrecedure.query(async ({ ctx }) => {
    if (!ctx.orgId)
      throw new TRPCError({
        code: "UNAUTHORIZED",
      });

    const users = await clerkClient.organizations.getOrganizationMembershipList(
      {
        organizationId: ctx.orgId,
      },
    );

    return users.map((user) => ({
      firstName: user.publicUserData?.firstName || "N/A",
      lastName: user.publicUserData?.lastName || "N/A",
    }));
  }),
});

export const usersRouter = createTRPCRouter({
  mutation: mutationRouter,
  query: queryRouter,
});
