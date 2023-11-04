import { z } from "zod";
import { Row } from "@tanstack/react-table";

import { clientSchema } from "./schema";

export type Client = z.infer<typeof clientSchema>;

export type DataTableRowActionsProps = {
  row: Row<Client>;
};

export type ClientsListTableProps = {
  data: Client[];
};
