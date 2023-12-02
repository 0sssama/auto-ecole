import { z } from "zod";
import { Category } from "@prisma/client";

export const studentSchema = z.object({
  id: z.number(),
  name: z.string(),
  archived: z.boolean(),
  status: z.enum(["active", "rejected", "finished", "not-started"]),
  category: z.nativeEnum(Category).optional(),
});

export type Student = z.infer<typeof studentSchema>;
