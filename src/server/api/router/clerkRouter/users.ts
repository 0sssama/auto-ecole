import { z } from "zod";
import { clerkClient } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";

import { createTRPCRouter, orgAdminOnlyPrecedure } from "@/server/api/trpc";
import { studentFormSchema } from "@/schemas/student-form-schema";
import { InstructorFormSchema } from "@/schemas/instructor-form-schema";
import { createNewCredentials } from "@/utils/createNewCredentials";

const mutationRouter = createTRPCRouter({
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
      if (!ctx.orgId)
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
        firstName: InstructorFormSchema.shape.firstName,
        lastName: InstructorFormSchema.shape.lastName,
        phoneNumber: InstructorFormSchema.shape.phone,
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
