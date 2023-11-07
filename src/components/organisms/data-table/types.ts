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

export type TableFilters = {
  get: {
    search: string;
  };
  set: {
    search: (search: string) => void;
  };
  helpers: {
    resetSearch: () => void;
    resetAll: () => void;
  };
};

export type Paginated<TData> = {
  data: TData[];
  pageCount: number;
};

export type TableProps<TData, TValue> = {
  data: Paginated<TData> | undefined;
  columns: ColumnDef<TData, TValue>[];
  error: string | undefined;
  isLoading: boolean;
  pagination: TablePagination;
  filters: TableFilters;
};

export type DataTableRowActionsProps<TData> = {
  row: Row<TData>;
};

export type DataTablePaginationProps = {
  pagination: TablePagination;
};

export type DataTableToolbarProps = {
  filters: TableFilters;
};
