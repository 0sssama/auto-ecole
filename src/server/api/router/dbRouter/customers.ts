import { z } from "zod";

import { ClientFormSchema } from "@/schemas/client-form-schema";
import { createTRPCRouter, orgAdminOnlyPrecedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

const mutationRouter = createTRPCRouter({
  add: orgAdminOnlyPrecedure
    .input(
      z.object({
        clerkId: z.string(),
        ...ClientFormSchema.shape,
      }),
    )
    .mutation(async ({ input, ctx }) => {
      if (!ctx.orgId)
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });

      const user = await ctx.prisma.customer.create({
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

          email: input.email,
          phone: input.phone,
          cin: input.cin,
          birthdate: input.birthdate,
        },
      });

      return {
        newUserId: user.id,
        newUserClerkId: user.clerkUserId,
      };
    }),
  dearchive: orgAdminOnlyPrecedure
    .input(z.object({ clientId: z.number() }))
    .mutation(async ({ input, ctx }) => {
      if (!ctx.orgId)
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });

      try {
        await ctx.prisma.customer.update({
          where: {
            id: input.clientId,
          },
          data: {
            archived: false,
          },
        });

        return true;
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
  archive: orgAdminOnlyPrecedure
    .input(z.object({ clientId: z.number() }))
    .mutation(async ({ input, ctx }) => {
      if (!ctx.orgId)
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });

      try {
        await ctx.prisma.customer.update({
          where: {
            id: input.clientId,
          },
          data: {
            archived: true,
          },
        });

        return true;
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
  delete: orgAdminOnlyPrecedure
    .input(z.object({ clientId: z.number() }))
    .mutation(async ({ input, ctx }) => {
      if (!ctx.orgId)
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });

      try {
        const result = await ctx.prisma.customer.delete({
          where: {
            id: input.clientId,
          },
          select: {
            clerkUserId: true,
          },
        });

        return {
          clerkUserId: result.clerkUserId,
        };
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
});

const queryRouter = createTRPCRouter({
  list: orgAdminOnlyPrecedure
    // .input(
    //   z.object({
    //     page: z.number().default(1),
    //     pageSize: z.number().default(10),
    //   })
    // )
    .query(async ({ ctx }) => {
      if (!ctx.orgId)
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });

      const users = await ctx.prisma.customer.findMany({
        where: {
          clerkOrgId: ctx.orgId,
        },
        select: {
          id: true,
          firstNameFr: true,
          lastNameFr: true,
          createdAt: true,
          archived: true,
        },
      });

      return users.map((user) => ({
        id: user.id,
        name: `${user.firstNameFr} ${user.lastNameFr}`,
        createdAt: user.createdAt,
        archived: user.archived,
      }));
    }),
});

export const customersRoute = createTRPCRouter({
  query: queryRouter,
  mutation: mutationRouter,
});
