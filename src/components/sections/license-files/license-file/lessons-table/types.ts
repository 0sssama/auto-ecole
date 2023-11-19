import { Row } from "@tanstack/react-table";

import type { LicenseFileLesson } from "./schema";

export type ActionsColumnProps = {
  row: Row<LicenseFileLesson>;
};

export type LicenseFileLessonsTableProps = {
  licenseFileId: number;
};
