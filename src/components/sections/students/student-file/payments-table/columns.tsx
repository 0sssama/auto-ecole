"use client";

import moment from "moment";
import type { ColumnDef } from "@tanstack/react-table";

import DataTableColumnHeader from "@/components/organisms/data-table/column-header";
import { Tooltip, TooltipConcat } from "@/components/atoms";

import ActionsColumn from "./actions-column";
import { studentPaymentSchema, type StudentPayment } from "./schema";

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
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="StudentPayments.date" />
    ),
    cell: ({ row }) => {
      const studentPayment = studentPaymentSchema.parse(row.original);
      const date = moment(studentPayment.date);

      return <Tooltip content={date.calendar()}>{date.fromNow()}</Tooltip>;
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
