"use client";

import Link from "next/link";
import moment from "moment";
import { useTranslations } from "next-intl";
import { Chip } from "@nextui-org/chip";
import type { ColumnDef } from "@tanstack/react-table";

import DataTableColumnHeader from "@/components/organisms/data-table/column-header";
import { Tooltip, TooltipConcat } from "@/components/atoms";
import { getLicenseFileStatusChipColor } from "@/lib/getChipColors";

import ActionsColumn from "./actions-column";
import {
  instructorLicenseFileSchema,
  type InstructorLicenseFile,
} from "./schema";

export const columns: ColumnDef<InstructorLicenseFile>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="InstructorLicenseFiles.id"
      />
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
        title="InstructorLicenseFiles.student-name"
      />
    ),
    cell: ({ row }) => {
      const licenseFile = instructorLicenseFileSchema.parse(row.original);

      return (
        <Link
          href={`/dash/admin/license-files?licenseFileId=${licenseFile.id}`}
          className="flex w-full h-full"
        >
          <TooltipConcat className="text-left" text={licenseFile.studentName} />
        </Link>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="InstructorLicenseFiles.category"
      />
    ),
    cell: function Cell({ row }) {
      const t = useTranslations(
        "Dashboard.Dossier.Tables.InstructorLicenseFiles.Category",
      );
      const licenseFile = instructorLicenseFileSchema.parse(row.original);

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
      <DataTableColumnHeader
        column={column}
        title="InstructorLicenseFiles.price"
      />
    ),
    cell: ({ row }) => {
      const licenseFile = instructorLicenseFileSchema.parse(row.original);

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
      <DataTableColumnHeader
        column={column}
        title="InstructorLicenseFiles.status"
      />
    ),
    cell: function Cell({ row }) {
      const t = useTranslations(
        "Dashboard.Dossier.Tables.InstructorLicenseFiles.Status",
      );
      const licenseFile = instructorLicenseFileSchema.parse(row.original);

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
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="InstructorLicenseFiles.created-at"
      />
    ),
    cell: ({ row }) => {
      const licenseFile = instructorLicenseFileSchema.parse(row.original);

      const date = moment(licenseFile.createdAt);

      return (
        <Link
          href={`/dash/admin/license-files?licenseFileId=${licenseFile.id}`}
          className="flex w-full h-full"
        >
          <Tooltip content={date.calendar()}>{date.fromNow()}</Tooltip>
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
