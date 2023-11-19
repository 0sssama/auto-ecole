import { Row } from "@tanstack/react-table";

import type { LicenseFile } from "./schema";

export type ActionsColumnProps = {
  row: Row<LicenseFile>;
};
