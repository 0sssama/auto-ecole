import { VehicleType } from "@prisma/client";
import { z } from "zod";

export const vehicleSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string(),
  brand: z.string(),
  type: z.nativeEnum(VehicleType),
  active: z.boolean(),
  instructor: z.object({
    id: z.number(),
    fullName: z.string(),
  }),
});

export type Vehicle = z.infer<typeof vehicleSchema>;
