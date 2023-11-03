import { z } from "zod";

import { ClientFormSchema } from "@/schemas/client-form-schema";
import { createTRPCRouter, orgAdminOnlyPrecedure } from "@/server/api/trpc";
import { prisma } from "@/server/db";

const mutationRouter = createTRPCRouter({
  add: orgAdminOnlyPrecedure
    .input(
      z.object({
        clerkId: z.string(),
        ...ClientFormSchema.shape,
      }),
    )
    .mutation(async ({ input }) => {
      const user = await prisma.customer.create({
        data: {
          clerkId: input.clerkId,

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
        newUserClerkId: user.clerkId,
      };
    }),
});

const queryRouter = createTRPCRouter({});

export const usersRouter = createTRPCRouter({
  query: queryRouter,
  mutation: mutationRouter,
});
