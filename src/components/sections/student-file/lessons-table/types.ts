import { Row } from "@tanstack/react-table";

import type { StudentLesson } from "./schema";

export type ActionsColumnProps = {
  row: Row<StudentLesson>;
};

export type StudentLessonsTableProps = {
  studentId: number;
};
