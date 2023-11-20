"use client";

import Link from "next/link";
import moment from "moment";
import { ExamStatus } from "@prisma/client";
import { Chip, ChipProps } from "@nextui-org/chip";
import { useTranslations } from "next-intl";
import type { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/organisms/data-table/column-header";
import { Tooltip } from "@/components/atoms";
import { ActionsColumn } from "./actions-column";
import { examSchema } from "./schema";

import type { Exam } from "./schema";

export const columns: ColumnDef<Exam>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Exams.id" />
    ),
    cell: ({ row }) => <>{row.getValue("id")}</>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "student-name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Exams.student-name" />
    ),
    cell: ({ row }) => {
      const exam = examSchema.parse(row.original);

      return (
        <Link href={`/dash/admin/students?studentId=${exam.student.id}`}>
          {exam.student.fullName}
        </Link>
      );
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Exams.type" />
    ),
    cell: function Cell({ row }) {
      const exam = examSchema.parse(row.original);
      const t = useTranslations("Dashboard.Files.Exams.ListTable.Type");

      return <p>{t(exam.type)}</p>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Exams.status" />
    ),
    cell: function Cell({ row }) {
      const exam = examSchema.parse(row.original);
      const t = useTranslations("Dashboard.Files.Exams.ListTable.Status");

      const getChipColor = (): ChipProps["color"] => {
        switch (exam.status) {
          case ExamStatus.FAILED:
            return "danger";
          case ExamStatus.PENDING:
            return "primary";
          case ExamStatus.SUCCESS:
            return "success";
          default:
            return "primary";
        }
      };

      return (
        <Chip color={getChipColor()} size="sm">
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
      <DataTableColumnHeader column={column} title="Exams.date" />
    ),
    cell: ({ row }) => {
      const exam = examSchema.parse(row.original);

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
