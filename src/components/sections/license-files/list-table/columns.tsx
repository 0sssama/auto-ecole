"use client";

import Link from "next/link";
import moment from "moment";
import { Chip } from "@nextui-org/chip";
import { useTranslations } from "next-intl";
import type { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/organisms/data-table/column-header";
import { Tooltip, TooltipConcat } from "@/components/atoms";
import { getLicenseFileStatusChipColor } from "@/lib/getChipColors";

import { ActionsColumn } from "./actions-column";
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
        <Link href={`/dash/admin/students?studentId=${licenseFile.student.id}`}>
          <TooltipConcat
            className="text-left"
            text={licenseFile.student.name}
          />
        </Link>
      );
    },
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
          href={`/dash/admin/instructors?instructorId=${licenseFile.instructor.id}`}
        >
          <TooltipConcat
            className="text-left"
            text={licenseFile.instructor.name}
          />
        </Link>
      );
    },
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
        <>
          {t(licenseFile.category)} ({licenseFile.category})
        </>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="LicenseFiles.price" />
    ),
    cell: ({ row }) => <>{row.getValue("price")} DH</>,
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
        <Chip
          color={getLicenseFileStatusChipColor(licenseFile.status)}
          size="sm"
        >
          <span className="font-bold !text-[10px] md:text-sm">
            {t(licenseFile.status)?.toUpperCase()}
          </span>
        </Chip>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="LicenseFiles.created-at" />
    ),
    cell: ({ row }) => {
      const licenseFile = licenseFileSchema.parse(row.original);
      const date = moment(licenseFile.createdAt);

      return <Tooltip content={date.calendar()}>{date.fromNow()}</Tooltip>;
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
