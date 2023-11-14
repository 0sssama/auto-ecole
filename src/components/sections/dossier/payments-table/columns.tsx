"use client";

import moment from "moment";

import { DataTableColumnHeader } from "@/components/organisms/data-table/column-header";
import { ActionsColumn } from "./actions-column";
import { studentPaymentSchema } from "./schema";

import type { ColumnDef } from "@tanstack/react-table";
import type { StudentPayment } from "./schema";

export const columns: ColumnDef<StudentPayment>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="StudentPayments.id" />
    ),
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "sum",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="StudentPayments.sum" />
    ),
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center">
        {row.getValue("sum")} DH
      </div>
    ),
  },
  {
    accessorKey: "comment",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="StudentPayments.comment" />
    ),
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center">
        {row.getValue("comment") || "-"}
      </div>
    ),
  },
  {
    accessorKey: "admin-name",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="StudentPayment.admin-name"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          {row.getValue("adminName")}
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="StudentPayments.date" />
    ),
    cell: ({ row }) => {
      const studentPayment = studentPaymentSchema.parse(row.original);

      return (
        <div className="flex w-[100px] items-center">
          {moment(studentPayment.date).fromNow()}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex items-center justify-end">
        <ActionsColumn row={row} />
      </div>
    ),
  },
];
