"use client";

import Link from "next/link";
import moment from "moment";
import { useTranslations } from "next-intl";
import { Chip, ChipProps } from "@nextui-org/chip";
import { LicenseFileStatus } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/organisms/data-table/column-header";
import { Tooltip, TooltipConcat } from "@/components/atoms";
import { ActionsColumn } from "./actions-column";
import { licenseFileSchema } from "./schema";

import type { StudentLicenseFile } from "./schema";

export const columns: ColumnDef<StudentLicenseFile>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="StudentLicenseFiles.id" />
    ),
    cell: ({ row }) => <>{row.getValue("id")}</>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "instructor-name",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="StudentLessons.instructor-name"
      />
    ),
    cell: ({ row }) => {
      const studentLicenseFile = licenseFileSchema.parse(row.original);

      return (
        <Link
          href={`/dash/admin/instructors?instructorId=${studentLicenseFile.instructorId}`}
        >
          <TooltipConcat text={studentLicenseFile.instructorName} />
        </Link>
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="StudentLicenseFiles.category"
      />
    ),
    cell: function Cell({ row }) {
      const t = useTranslations(
        "Dashboard.Dossier.Tables.StudentLicenseFiles.Category",
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
      <DataTableColumnHeader
        column={column}
        title="StudentLicenseFiles.price"
      />
    ),
    cell: ({ row }) => <>{row.getValue("price")} DH</>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="StudentLicenseFiles.status"
      />
    ),
    cell: function Cell({ row }) {
      const t = useTranslations(
        "Dashboard.Dossier.Tables.StudentLicenseFiles.Status",
      );
      const licenseFile = licenseFileSchema.parse(row.original);

      const getChipColor = (): ChipProps["color"] => {
        switch (licenseFile.status) {
          case LicenseFileStatus.ONGOING:
            return "secondary";
          case LicenseFileStatus.REJECTED:
            return "danger";
          case LicenseFileStatus.VALIDATED:
            return "success";
          default:
            return "primary";
        }
      };

      return (
        <Chip color={getChipColor()} size="sm">
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
      <DataTableColumnHeader
        column={column}
        title="StudentLicenseFiles.created-at"
      />
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
