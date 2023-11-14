import { Row } from "@tanstack/react-table";

import type { StudentPayment } from "./schema";

export type ActionsColumnProps = {
  row: Row<StudentPayment>;
};

export type StudentPaymentsTableProps = {
  studentId: number;
};
