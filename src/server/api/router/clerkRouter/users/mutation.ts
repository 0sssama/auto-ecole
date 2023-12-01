import { z } from "zod";
import { clerkClient } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";

import { createTRPCRouter, orgAdminOnlyPrecedure } from "@/server/api/trpc";
import { studentFormSchema } from "@/schemas/student-form-schema";
import { instructorFormSchema } from "@/schemas/instructor-form-schema";
import { createNewCredentials } from "@/utils/createNewCredentials";

export const mutationRouter = createTRPCRouter({
  add: orgAdminOnlyPrecedure
    .input(
      z.object({
        firstName: studentFormSchema.shape.firstNameFr,
        lastName: studentFormSchema.shape.lastNameFr,
        emailAddress: studentFormSchema.shape.email,
        phoneNumber: studentFormSchema.shape.phone,
        cin: studentFormSchema.shape.cin,
      }),
    )
    .mutation(async ({ input, ctx }) => {
      if (!ctx.userId || !ctx.orgId)
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });

      const user = await clerkClient.users.createUser({
        firstName: input.firstName,
        lastName: input.lastName,
        ...createNewCredentials({
          firstName: input.firstName,
          lastName: input.lastName,
          phoneNumber: input.phoneNumber,
          cin: input.cin,
        }),
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

  addInstructor: orgAdminOnlyPrecedure
    .input(
      z.object({
        firstName: instructorFormSchema.shape.firstName,
        lastName: instructorFormSchema.shape.lastName,
        phoneNumber: instructorFormSchema.shape.phone,
      }),
    )
    .mutation(async ({ input, ctx }) => {
      if (!ctx.userId || !ctx.orgId)
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });

      const user = await clerkClient.users.createUser({
        firstName: input.firstName,
        lastName: input.lastName,
        ...createNewCredentials({
          firstName: input.firstName,
          lastName: input.lastName,
          phoneNumber: input.phoneNumber,
          isInstructor: true,
        }),
        skipPasswordChecks: true,
        skipPasswordRequirement: true,
      });

      try {
        await clerkClient.organizations.createOrganizationMembership({
          organizationId: ctx.orgId,
          userId: user.id,
          role: "admin",
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
    .mutation(async ({ ctx, input }) => {
      if (!ctx.userId || !ctx.orgId)
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });

      await clerkClient.users.deleteUser(input.clerkUserId);

      return {
        clerkId: input.clerkUserId,
      };
    }),
});
