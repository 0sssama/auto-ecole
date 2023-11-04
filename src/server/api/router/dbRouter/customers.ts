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
