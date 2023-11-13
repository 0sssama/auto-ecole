import { createTRPCRouter } from "@/server/api/trpc";
import { customersRouter } from "./customers";
import { licenseFilesRouter } from "./license-files";

export const dbRouter = createTRPCRouter({
  customers: customersRouter,
  licenseFiles: licenseFilesRouter,
});
