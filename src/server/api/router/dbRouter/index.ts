import { createTRPCRouter } from "@/server/api/trpc";
import { studentsRouter } from "./students";
import { instructorsRouter } from "./instructors";
import { licenseFilesRouter } from "./license-files";
import { lessonsRouter } from "./lessons";
import { paymentsRouter } from "./payments";
import { examsRouter } from "./exams";
import { adminsRouter } from "./admins";

export const dbRouter = createTRPCRouter({
  students: studentsRouter,
  instructors: instructorsRouter,
  licenseFiles: licenseFilesRouter,
  lessons: lessonsRouter,
  payments: paymentsRouter,
  exams: examsRouter,
  admins: adminsRouter,
});
