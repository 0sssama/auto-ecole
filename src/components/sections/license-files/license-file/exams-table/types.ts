import { Row } from "@tanstack/react-table";

import type { LicenseFileExam } from "./schema";

export type ActionsColumnProps = {
  row: Row<LicenseFileExam>;
};

export type LicenseFileExamsTableProps = {
  licenseFileId: number;
};
