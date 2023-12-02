import { createTRPCRouter } from "@/server/api/trpc";
import { queryRouter } from "./query";
import { mutationRouter } from "./mutation";

export const paymentsRouter = createTRPCRouter({
  query: queryRouter,
  mutation: mutationRouter,
});
