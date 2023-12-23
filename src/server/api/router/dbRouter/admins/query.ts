import {
  createTRPCRouter,
  orgAdminOnlyPrecedure,
  orgSuperAdminOnlyPrecedure,
} from "@/server/api/trpc";

export const queryRouter = createTRPCRouter({
  isSuperAdmin: orgSuperAdminOnlyPrecedure.query(({ ctx }) => ctx.isSuperAdmin),
  isAdmin: orgAdminOnlyPrecedure.query(({ ctx }) => ctx.isAdmin),
});
