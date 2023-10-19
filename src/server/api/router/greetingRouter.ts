import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const greetingRouter = createTRPCRouter({
  getGreeting: publicProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .query(({ input }) => {
      return {
        greeting: `Hello there, ${input.name}!`,
      };
    }),
});
