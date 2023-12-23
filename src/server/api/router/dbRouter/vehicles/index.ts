import { createTRPCRouter } from "@/server/api/trpc";
import { queryRouter } from "./query";

export const vehiclesRouter = createTRPCRouter({
  query: queryRouter,
});
