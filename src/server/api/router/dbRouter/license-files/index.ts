import { createTRPCRouter } from "@/server/api/trpc";
import { queryRouter } from "./query";

export const licenseFilesRouter = createTRPCRouter({
  query: queryRouter,
});
