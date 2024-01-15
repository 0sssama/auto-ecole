import type { FC, HTMLAttributes } from 'react';
import type { Column, ColumnDef, Row } from '@tanstack/react-table';

export interface DataTableColumnHeaderProps<TData, TValue> extends HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export interface DataTableStatusComponentProps {
  status?: TableStatus;
}
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
    pagination: (pagination: Omit<TablePagination['get'], 'pageCount'>) => void;
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

export type TableStatus = {
  get: {
    status: string[];
  };
  set: {
    status: (status: string) => void;
  };
  delete: {
    status: (status: string) => void;
  };
  helpers: {
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
  status?: TableStatus;
  filters: TableFilters;
  filtersAllowed?: {
    [filterName in keyof TableFilters['get']]?: boolean;
  };
};

export type DataTableRowActionsProps<TData> = {
  row: Row<TData>;
};

export type ActionsColumnComponentType<TData> = FC<DataTableRowActionsProps<TData>>;

export type DataTablePaginationProps = {
  pagination: TablePagination;
};

export type DataTablePaginationComponentType = FC<DataTablePaginationProps>;

export type DataTableToolbarProps = {
  filters: TableFilters;
  filtersAllowed?: {
    [filterName in keyof TableFilters['get']]?: boolean;
  };
};

export type DataTableToolbarComponentType = FC<DataTableToolbarProps>;
