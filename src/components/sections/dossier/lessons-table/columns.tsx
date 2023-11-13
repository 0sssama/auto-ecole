"use client";

import moment from "moment";
import { LessonStatus } from "@prisma/client";
import { Chip, ChipProps } from "@nextui-org/chip";
import { useTranslations } from "next-intl";

import { DataTableColumnHeader } from "@/components/organisms/data-table/column-header";
import { ActionsColumn } from "./actions-column";
import { studentLessonSchema } from "./schema";

import type { ColumnDef } from "@tanstack/react-table";
import type { StudentLesson } from "./schema";

export const columns: ColumnDef<StudentLesson>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="StudentLessons.id" />
    ),
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "monitor-name",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="StudentLessons.monitor-name"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          {row.getValue("monitorName")}
        </div>
      );
    },
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
        "Dashboard.Dossier.Tables.StudentLessons.Status",
      );
      const studentLesson = studentLessonSchema.parse(row.original);

      const getChipColor = (): ChipProps["color"] => {
        switch (studentLesson.status) {
          case LessonStatus.RESERVED:
            return "secondary";
          case LessonStatus.CANCELLED:
            return "danger";
          case LessonStatus.DONE:
            return "success";
          default:
            return "primary";
        }
      };

      return (
        <Chip color={getChipColor()} size="sm">
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
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center">
        {row.getValue("comment") || "-"}
      </div>
    ),
  },
  {
    accessorKey: "grade",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="StudentLessons.grade" />
    ),
    cell: ({ row }) => {
      const studentLesson = studentLessonSchema.parse(row.original);

      const getChipColor = (): ChipProps["color"] => {
        switch (true) {
          case studentLesson.grade < 30:
            return "danger";
          case studentLesson.grade >= 30 && studentLesson.grade < 60:
            return "primary";
          case studentLesson.grade >= 60:
            return "success";
          default:
            return "primary";
        }
      };

      if (studentLesson.grade === -1) return <>-</>;

      return (
        <Chip color={getChipColor()} size="sm">
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
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center">
        {row.getValue("price")} DH
      </div>
    ),
  },
  {
    accessorKey: "duration",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="StudentLessons.duration" />
    ),
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center">
        {row.getValue("duration")}h
      </div>
    ),
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

      return (
        <div className="flex w-[100px] items-center">
          {moment(studentLesson.scheduledDate).fromNow()}
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
        <ActionsColumn row={row} />
      </div>
    ),
  },
];
