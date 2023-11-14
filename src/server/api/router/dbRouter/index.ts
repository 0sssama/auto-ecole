import { createTRPCRouter } from "@/server/api/trpc";
import { customersRouter } from "./customers";
import { licenseFilesRouter } from "./license-files";
import { lessonsRouter } from "./lessons";
import { paymentsRouter } from "./payments";

export const dbRouter = createTRPCRouter({
  customers: customersRouter,
  licenseFiles: licenseFilesRouter,
  lessons: lessonsRouter,
  payments: paymentsRouter,
});
