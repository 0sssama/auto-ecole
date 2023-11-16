import { Row } from "@tanstack/react-table";
import { InstructorLicenseFile } from "./schema";

export type ActionsColumnProps = {
  row: Row<InstructorLicenseFile>;
};

export type InstructorLicenseFilesTableProps = {
  instructorId: number;
};
