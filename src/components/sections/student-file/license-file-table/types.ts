import { Row } from "@tanstack/react-table";

import type { StudentLicenseFile } from "./schema";

export type ActionsColumnProps = {
  row: Row<StudentLicenseFile>;
};

export type StudentLicenseFilesTableProps = {
  studentId: number;
};
