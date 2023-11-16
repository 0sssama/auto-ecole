import { z } from "zod";

export const studentSchema = z.object({
  id: z.number(),
  name: z.string(),
  archived: z.boolean(),
  isNew: z.boolean(),
  createdAt: z.date(),
  status: z.enum(["active", "rejected", "finished", "not-started"]),
});

export type Student = z.infer<typeof studentSchema>;
