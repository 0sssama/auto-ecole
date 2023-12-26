import { z } from "zod";

import { createTRPCRouter, orgAdminOnlyPrecedure } from "@/server/api/trpc";
import { countPages } from "@/utils/countPages";
import type { Vehicle } from "@/components/sections/vehicles/list-table/schema";

import { getWhereObjFromFilters } from "./utils";

export const queryRouter = createTRPCRouter({
  list: orgAdminOnlyPrecedure
    .input(
      z.object({
        pageIndex: z.number().default(0),
        pageSize: z.number().default(10),
        filters: z.object({
          search: z.string(),
        }),
      }),
    )
    .query(async ({ ctx, input }) => {
      const filtersObj = getWhereObjFromFilters(input.filters);

      const [vehicles, totalVehicles] = await Promise.all([
        ctx.prisma.vehicle.findMany({
          where: {
            ...filtersObj,
            instructor: {
              account: {
                clerkOrgId: ctx.orgId,
              },
            },
          },
          select: {
            id: true,
            name: true,
            image: true,
            type: true,
            active: true,
            brand: true,
            instructor: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          take: input.pageSize,
          skip: input.pageIndex * input.pageSize,
        }),
        ctx.prisma.vehicle.count({
          where: {
            ...filtersObj,
            instructor: {
              account: {
                clerkOrgId: ctx.orgId,
              },
            },
          },
        }),
      ]);

      const formattedVehicles: Vehicle[] = vehicles.map((vehicle) => ({
        id: vehicle.id,
        image: vehicle.image,
        name: vehicle.name,
        type: vehicle.type,
        active: vehicle.active,
        brand: vehicle.brand,
        instructor: {
          id: vehicle.instructor.id,
          fullName: `${vehicle.instructor.firstName} ${vehicle.instructor.lastName}`,
        },
      }));

      return {
        data: formattedVehicles,
        pageCount: countPages(totalVehicles, input.pageSize),
      };
    }),
});
