"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import { Client } from "./types";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { clientSchema } from "./schema";
import moment from "moment";
import Link from "next/link";

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="id" />
    ),
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="name" />
    ),
    cell: function Cell({ row }) {
      const t = useTranslations("Dashboard.Users.ListClientsTable");
      const client = clientSchema.parse(row.original);

      return (
        <Link
          className="flex space-x-2"
          href={`/dash/admin/clients/folder?clientId=${client.id}`}
        >
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("name")}
          </span>
          {client.archived && <Badge variant="default">{t("archived")}</Badge>}
        </Link>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="created-at" />
    ),
    cell: ({ row }) => {
      const client = clientSchema.parse(row.original);

      return (
        <div className="flex w-[100px] items-center">
          {moment(client.createdAt).fromNow()}
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
        <DataTableRowActions row={row} />
      </div>
    ),
  },
];
