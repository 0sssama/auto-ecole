import { z } from "zod";
import { VehicleType } from "@prisma/client";

import { isDigits } from "@/utils/isDigits";

export const vehicleFormSchema = z.object({
  name: z.string(),
  brand: z.string(),
  image: z.string(),
  instructorId: z.string().refine(isDigits),
  type: z.nativeEnum(VehicleType),
});

export const vehicleFormSchemaBackend = z.object({
  ...vehicleFormSchema.shape,
  instructorId: z.number().min(1),
});
