import { Row } from "@tanstack/react-table";
import { LicenseFile } from "./schema";

export type ActionsColumnProps = {
  row: Row<LicenseFile>;
};

export type StudentLicenseFilesTableProps = {
  studentId: number;
};
