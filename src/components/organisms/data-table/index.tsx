"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import {
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Spinner } from "@/components/atoms";
import { DataTablePagination } from "./pagination";
import { DataTableToolbar } from "./toolbar";

import type { TableProps } from "./types";

function DataTable<TData, TValue>({
  data,
  columns,
  pagination,
  filters,
  error,
  isLoading,
  filtersAllowed,
}: TableProps<TData, TValue>) {
  const t = useTranslations("Dashboard.Tables");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: data?.data ?? [],
    columns,
    manualPagination: true,
    manualFiltering: true,
    state: {
      sorting,
      columnVisibility,
      pagination: pagination.get,
    },
    enableRowSelection: true,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  useEffect(() => {
    // when filters are changed, reset page to 0
    pagination.set.pageIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.get]);

  useEffect(() => {
    if (!data) return;

    pagination.set.pageCount(data.pageCount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div className="w-full space-y-4 max-w-[90vw] overflow-x-auto">
      <DataTableToolbar filters={filters} filtersAllowed={filtersAllowed} />
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {isLoading && !error && (
                    <div className="flex items-center justify-center w-full h-full">
                      <Spinner size="sm" />
                    </div>
                  )}
                  {error && !isLoading && t("error")}
                  {!error && !isLoading && t("no-data")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination pagination={pagination} />
    </div>
  );
}

export default DataTable;
