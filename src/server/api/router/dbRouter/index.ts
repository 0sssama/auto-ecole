import { createTRPCRouter } from "@/server/api/trpc";
import { customersRoute } from "./customers";

export const dbRouter = createTRPCRouter({
  customers: customersRoute,
});
