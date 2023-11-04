import { z } from "zod";

export const clientSchema = z.object({
  id: z.number(),
  name: z.string(),
  archived: z.boolean(),
  createdAt: z.date(),
});
