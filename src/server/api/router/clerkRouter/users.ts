import { createTRPCRouter, orgAdminOnlyPrecedure } from "@/server/api/trpc";

export const usersRouter = createTRPCRouter({
  add: orgAdminOnlyPrecedure.mutation(() => {
    console.log("got req");
    return {
      greeting: `Hello!`,
    };
  }),
});
