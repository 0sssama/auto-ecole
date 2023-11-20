import { Row } from "@tanstack/react-table";

import type { InstructorLesson } from "./schema";

export type ActionsColumnProps = {
  row: Row<InstructorLesson>;
};

export type InstructorLessonsTableProps = {
  instructorId: number;
};
