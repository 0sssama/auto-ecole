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
        <Link href={`/dash/admin/students?studentId=${licenseFile.studentId}`}>
          <TooltipConcat className="text-left" text={licenseFile.studentName} />
        </Link>
      );
    },
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
        title="InstructorLicenseFiles.price"
      />
    ),
    cell: ({ row }) => <>{row.getValue("price")} DH</>,
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
      <DataTableColumnHeader
        column={column}
        title="InstructorLicenseFiles.created-at"
      />
    ),
    cell: ({ row }) => {
      const licenseFile = instructorLicenseFileSchema.parse(row.original);

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
