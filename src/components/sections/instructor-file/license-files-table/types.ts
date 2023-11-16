import { Row } from "@tanstack/react-table";

import type { InstructorLicenseFile } from "./schema";

export type ActionsColumnProps = {
  row: Row<InstructorLicenseFile>;
};

export type InstructorLicenseFilesTableProps = {
  instructorId: number;
};
