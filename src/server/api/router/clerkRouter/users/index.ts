import { createTRPCRouter } from "@/server/api/trpc";
import { mutationRouter } from "./mutation";
import { queryRouter } from "./query";

export const usersRouter = createTRPCRouter({
  mutation: mutationRouter,
  query: queryRouter,
});
