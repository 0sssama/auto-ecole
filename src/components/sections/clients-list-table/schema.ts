import { z } from "zod";

export const clientSchema = z.object({
  id: z.number(),
  name: z.string(),
  archived: z.boolean(),
  isNew: z.boolean(),
  createdAt: z.date(),
  status: z.enum(["active", "rejected", "finished", "not-started"]),
});

export type Client = z.infer<typeof clientSchema>;
