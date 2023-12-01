"use client";

import Link from "next/link";
import moment from "moment";
import { Chip } from "@nextui-org/chip";
import { useTranslations } from "next-intl";
import type { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/organisms/data-table/column-header";
import { Tooltip, TooltipConcat } from "@/components/atoms";
import {
  getLessonGradeChipColor,
  getLessonStatusChipColor,
} from "@/lib/getChipColors";

import { ActionsColumn } from "./actions-column";
import { studentLessonSchema, type StudentLesson } from "./schema";

export const columns: ColumnDef<StudentLesson>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="StudentLessons.id" />
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
      const studentLesson = studentLessonSchema.parse(row.original);

      return (
        <Link
          href={`/dash/admin/instructors?instructorId=${studentLesson.instructorId}`}
        >
          <TooltipConcat text={studentLesson.instructorName} />
        </Link>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="StudentLessons.status" />
    ),
    cell: function Cell({ row }) {
      const t = useTranslations(
        "Dashboard.Dossier.Tables.StudentLessons.Status",
      );
      const studentLesson = studentLessonSchema.parse(row.original);

      return (
        <Chip color={getLessonStatusChipColor(studentLesson.status)} size="sm">
          <span className="font-bold !text-[10px] md:text-sm">
            {t(studentLesson.status)?.toUpperCase()}
          </span>
        </Chip>
      );
    },
  },
  {
    accessorKey: "comment",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="StudentLessons.comment" />
    ),
    cell: ({ row }) => <TooltipConcat text={row.getValue("comment") || "-"} />,
  },
  {
    accessorKey: "grade",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="StudentLessons.grade" />
    ),
    cell: ({ row }) => {
      const studentLesson = studentLessonSchema.parse(row.original);

      if (studentLesson.grade === -1) return <>-</>;

      return (
        <Chip color={getLessonGradeChipColor(studentLesson.grade)} size="sm">
          <span className="font-bold !text-[10px] md:text-sm">
            {studentLesson.grade}
          </span>
        </Chip>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="StudentLessons.price" />
    ),
    cell: ({ row }) => <>{row.getValue("price")} DH</>,
  },
  {
    accessorKey: "duration",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="StudentLessons.duration" />
    ),
    cell: ({ row }) => <>{row.getValue("duration")}h</>,
  },
  {
    accessorKey: "scheduledDate",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="StudentLessons.scheduled-date"
      />
    ),
    cell: ({ row }) => {
      const studentLesson = studentLessonSchema.parse(row.original);
      const date = moment(studentLesson.scheduledDate);

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
