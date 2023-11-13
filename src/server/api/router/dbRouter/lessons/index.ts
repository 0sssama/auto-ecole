import { createTRPCRouter } from "@/server/api/trpc";
import { queryRouter } from "./query";

export const lessonsRouter = createTRPCRouter({
  query: queryRouter,
});
