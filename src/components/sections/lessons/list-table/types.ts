import { Row } from "@tanstack/react-table";

import type { Lesson } from "./schema";

export type ActionsColumnProps = {
  row: Row<Lesson>;
};
