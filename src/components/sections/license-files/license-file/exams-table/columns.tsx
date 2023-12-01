"use client";

import moment from "moment";
import { Chip } from "@nextui-org/chip";
import { useTranslations } from "next-intl";
import type { ColumnDef } from "@tanstack/react-table";

import DataTableColumnHeader from "@/components/organisms/data-table/column-header";
import { Tooltip } from "@/components/atoms";
import { getExamStatusChipColor } from "@/lib/getChipColors";

import ActionsColumn from "./actions-column";
import { licenseFileExamSchema, type LicenseFileExam } from "./schema";

export const columns: ColumnDef<LicenseFileExam>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="LicenseFileExams.id" />
    ),
    cell: ({ row }) => <>{row.getValue("id")}</>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="LicenseFileExams.type" />
    ),
    cell: function Cell({ row }) {
      const exam = licenseFileExamSchema.parse(row.original);
      const t = useTranslations(
        "Dashboard.Files.LicenseFiles.FilePage.LicenseFileExams.Type",
      );

      return <p>{t(exam.type)}</p>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="LicenseFileExams.status" />
    ),
    cell: function Cell({ row }) {
      const exam = licenseFileExamSchema.parse(row.original);
      const t = useTranslations(
        "Dashboard.Files.LicenseFiles.FilePage.LicenseFileExams.Status",
      );

      return (
        <Chip color={getExamStatusChipColor(exam.status)} size="sm">
          <span className="font-bold !text-[10px] md:text-sm">
            {t(exam.status)}
          </span>
        </Chip>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="LicenseFileExams.date" />
    ),
    cell: ({ row }) => {
      const exam = licenseFileExamSchema.parse(row.original);
      const date = moment(exam.date);

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
