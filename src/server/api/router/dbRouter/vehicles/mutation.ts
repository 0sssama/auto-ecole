import { z } from "zod";

import { vehicleFormSchemaBackend } from "@/schemas/vehicle-form-schema";
import { createTRPCRouter, orgAdminOnlyPrecedure } from "@/server/api/trpc";

export const mutationRouter = createTRPCRouter({
  create: orgAdminOnlyPrecedure
    .input(vehicleFormSchemaBackend)
    .mutation(async ({ ctx, input }) => {
      const newVehicle = await ctx.prisma.vehicle.create({
        data: {
          name: input.name,
          brand: input.brand,
          image: input.image,
          type: input.type,
          instructor: {
            connect: {
              id: input.instructorId,
            },
          },

          createdBy: {
            connect: {
              clerkId: ctx.userId,
            },
          },
        },
      });

      return newVehicle;
    }),

  activate: orgAdminOnlyPrecedure
    .input(z.object({ vehicleId: z.number().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const updatedVehicle = await ctx.prisma.vehicle.update({
        where: {
          id: input.vehicleId,
        },
        data: {
          active: true,
        },
      });

      return updatedVehicle;
    }),

  deactivate: orgAdminOnlyPrecedure
    .input(z.object({ vehicleId: z.number().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const updatedVehicle = await ctx.prisma.vehicle.update({
        where: {
          id: input.vehicleId,
        },
        data: {
          active: false,
        },
      });

      return updatedVehicle;
    }),
});
