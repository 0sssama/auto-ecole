import { ColumnDef, Row } from "@tanstack/react-table";

export type TableProps<TData, TValue> = {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
};

export type DataTableRowActionsProps<TData> = {
  row: Row<TData>;
};
