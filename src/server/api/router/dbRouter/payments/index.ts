import { createTRPCRouter } from "@/server/api/trpc";
import { queryRouter } from "./query";

export const paymentsRouter = createTRPCRouter({
  query: queryRouter,
});
