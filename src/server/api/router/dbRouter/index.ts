import { createTRPCRouter } from "@/server/api/trpc";
import { usersRouter } from "./users";

export const dbRouter = createTRPCRouter({
  users: usersRouter,
});
