import { Row } from "@tanstack/react-table";

import type { Student } from "./schema";

export type DataTableRowActionsProps = {
  row: Row<Student>;
};
