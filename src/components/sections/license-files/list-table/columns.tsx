"use client";

import Link from "next/link";
import { Chip } from "@nextui-org/chip";
import { useTranslations } from "next-intl";
import type { ColumnDef } from "@tanstack/react-table";

import DataTableColumnHeader from "@/components/organisms/data-table/column-header";
import { TooltipConcat } from "@/components/atoms";
import { getLicenseFileStatusChipColor } from "@/lib/getChipColors";

import ActionsColumn from "./actions-column";
import { licenseFileSchema, type LicenseFile } from "./schema";

export const columns: ColumnDef<LicenseFile>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="LicenseFiles.id" />
    ),
    cell: ({ row }) => <>{row.getValue("id")}</>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "student-name",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="LicenseFiles.student-name"
      />
    ),
    cell: ({ row }) => {
      const licenseFile = licenseFileSchema.parse(row.original);

      return (
        <Link
          href={`/dash/admin/license-files?licenseFileId=${licenseFile.id}`}
          className="flex w-full h-full"
        >
          <TooltipConcat
            className="text-left"
            text={licenseFile.student.name}
          />
        </Link>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "instructor-name",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="LicenseFiles.instructor-name"
      />
    ),
    cell: ({ row }) => {
      const licenseFile = licenseFileSchema.parse(row.original);

      return (
        <Link
          href={`/dash/admin/license-files?licenseFileId=${licenseFile.id}`}
          className="flex w-full h-full"
        >
          <TooltipConcat
            className="text-left"
            text={licenseFile.instructor.name}
          />
        </Link>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="LicenseFiles.category" />
    ),
    cell: function Cell({ row }) {
      const t = useTranslations(
        "Dashboard.Files.LicenseFiles.ListTable.Category",
      );

      const licenseFile = licenseFileSchema.parse(row.original);

      return (
        <Link
          href={`/dash/admin/license-files?licenseFileId=${licenseFile.id}`}
          className="flex w-full h-full"
        >
          {t(licenseFile.category)} ({licenseFile.category})
        </Link>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="LicenseFiles.price" />
    ),
    cell: function Cell({ row }) {
      const licenseFile = licenseFileSchema.parse(row.original);

      return (
        <Link
          href={`/dash/admin/license-files?licenseFileId=${licenseFile.id}`}
          className="flex w-full h-full"
        >
          {row.getValue("price")} DH
        </Link>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="LicenseFiles.status" />
    ),
    cell: function Cell({ row }) {
      const t = useTranslations(
        "Dashboard.Files.LicenseFiles.ListTable.Status",
      );
      const licenseFile = licenseFileSchema.parse(row.original);

      return (
        <Link
          href={`/dash/admin/license-files?licenseFileId=${licenseFile.id}`}
          className="flex w-full h-full"
        >
          <Chip
            color={getLicenseFileStatusChipColor(licenseFile.status)}
            size="sm"
          >
            <span className="font-bold !text-[10px] md:text-sm">
              {t(licenseFile.status)?.toUpperCase()}
            </span>
          </Chip>
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
