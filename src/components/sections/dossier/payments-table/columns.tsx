"use client";

import moment from "moment";

import { DataTableColumnHeader } from "@/components/organisms/data-table/column-header";
import { TooltipConcat } from "@/components/atoms";
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
    cell: ({ row }) => <>{row.getValue("id")}</>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "sum",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="StudentPayments.sum" />
    ),
    cell: ({ row }) => <>{row.getValue("sum")} DH</>,
  },
  {
    accessorKey: "comment",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="StudentPayments.comment" />
    ),
    cell: ({ row }) => <TooltipConcat text={row.getValue("comment") || "-"} />,
  },
  {
    accessorKey: "admin-name",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="StudentPayments.admin-name"
      />
    ),
    cell: ({ row }) => {
      const studentPayment = studentPaymentSchema.parse(row.original);

      return <TooltipConcat text={studentPayment.adminName} />;
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="StudentPayments.date" />
    ),
    cell: ({ row }) => {
      const studentPayment = studentPaymentSchema.parse(row.original);

      return <>{moment(studentPayment.date).fromNow()}</>;
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
