"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import type { ColumnDef } from "@tanstack/react-table";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DataTableColumnHeader from "@/components/organisms/data-table/column-header";

import ActionsColumn from "./actions-column";
import { vehicleSchema, type Vehicle } from "./schema";

export const columns: ColumnDef<Vehicle>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vehicles.id" />
    ),
    cell: ({ row }) => (
      <Link href={`/dash/admin/vehicles?vehicleId=${row.getValue("id")}`}>
        {row.getValue("id")}
      </Link>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vehicles.name" />
    ),
    cell: ({ row }) => {
      const vehicle = vehicleSchema.parse(row.original);

      return (
        <Link
          href={`/dash/admin/vehicles?vehicleId=${vehicle.id}`}
          className="flex items-center"
        >
          <Avatar className="h-9 w-9">
            <AvatarImage src={vehicle.image} alt={vehicle.name} />
            <AvatarFallback>
              {vehicle.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{vehicle.name}</p>
            <p className="text-sm text-muted-foreground">{vehicle.brand}</p>
          </div>
        </Link>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vehicles.type" />
    ),
    cell: function Cell({ row }) {
      const vehicle = vehicleSchema.parse(row.original);
      const t = useTranslations("Dashboard.Entities.Vehicles.ListTable.Type");

      return (
        <Link href={`/dash/admin/vehicles?vehicleId=${vehicle.id}`}>
          {t(vehicle.type)}
        </Link>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "instructor",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vehicles.instructor" />
    ),
    cell: ({ row }) => {
      const vehicle = vehicleSchema.parse(row.original);

      return (
        <Link href={`/dash/admin/vehicles?vehicleId=${vehicle.id}`}>
          {vehicle.instructor.fullName}
        </Link>
      );
    },
    enableSorting: false,
    enableHiding: false,
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
