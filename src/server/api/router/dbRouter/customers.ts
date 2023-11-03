import { z } from "zod";

import { ClientFormSchema } from "@/schemas/client-form-schema";
import { createTRPCRouter, orgAdminOnlyPrecedure } from "@/server/api/trpc";
import { prisma } from "@/server/db";
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

      const user = await prisma.customer.create({
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

      console.log(user);

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

      const users = await prisma.customer.findMany({
        where: {
          clerkOrgId: ctx.orgId,
        },
        select: {
          firstNameFr: true,
          firstNameAr: true,
          lastNameAr: true,
          lastNameFr: true,
        },
      });

      return users;
    }),
});

export const customersRoute = createTRPCRouter({
  query: queryRouter,
  mutation: mutationRouter,
});
