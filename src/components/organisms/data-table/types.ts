import { ColumnDef, Row } from "@tanstack/react-table";

export type TablePagination = {
  get: {
    pageIndex: number;
    pageSize: number;
    pageCount: number;
  };
  set: {
    pageIndex: (pageIndex: number) => void;
    pageSize: (pageSize: number) => void;
    pageCount: (pageCount: number) => void;
    pagination: (pagination: Omit<TablePagination["get"], "pageCount">) => void;
  };
  helpers: {
    previousPage: () => void;
    nextPage: () => void;
    canGetPreviousPage: () => boolean;
    canGetNextPage: () => boolean;
  };
};

export type Paginated<TData> = {
  data: TData[];
  pageCount: number;
};

export type TableProps<TData, TValue> = {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  pagination: TablePagination;
};

export type DataTableRowActionsProps<TData> = {
  row: Row<TData>;
};

export type DataTablePaginationProps = {
  pagination: TablePagination;
};
