import { createTRPCRouter } from "@/server/api/trpc";
import { clerkRouter } from "./router/clerkRouter";
import { dbRouter } from "./router/dbRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  db: dbRouter,
  clerk: clerkRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
