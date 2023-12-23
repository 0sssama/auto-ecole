import { createTRPCRouter } from "@/server/api/trpc";
import { queryRouter } from "./query";

export const adminsRouter = createTRPCRouter({
  query: queryRouter,
});
