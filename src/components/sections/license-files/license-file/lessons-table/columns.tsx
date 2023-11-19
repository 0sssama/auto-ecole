"use client";

import moment from "moment";
import { LessonStatus } from "@prisma/client";
import { Chip, ChipProps } from "@nextui-org/chip";
import { useTranslations } from "next-intl";
import type { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/organisms/data-table/column-header";
import { Tooltip, TooltipConcat } from "@/components/atoms";
import { ActionsColumn } from "./actions-column";
import { licenseFileLessonSchema } from "./schema";

import type { LicenseFileLesson } from "./schema";

export const columns: ColumnDef<LicenseFileLesson>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="LicenseFileLessons.id" />
    ),
    cell: ({ row }) => <>{row.getValue("id")}</>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="LicenseFileLessons.status"
      />
    ),
    cell: function Cell({ row }) {
      const t = useTranslations(
        "Dashboard.Files.LicenseFiles.FilePage.LicenseFileLessons.Status",
      );
      const lesson = licenseFileLessonSchema.parse(row.original);

      const getChipColor = (): ChipProps["color"] => {
        switch (lesson.status) {
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
            {t(lesson.status)?.toUpperCase()}
          </span>
        </Chip>
      );
    },
  },
  {
    accessorKey: "comment",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="LicenseFileLessons.comment"
      />
    ),
    cell: ({ row }) => <TooltipConcat text={row.getValue("comment") || "-"} />,
  },
  {
    accessorKey: "grade",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="LicenseFileLessons.grade" />
    ),
    cell: ({ row }) => {
      const lesson = licenseFileLessonSchema.parse(row.original);

      const getChipColor = (): ChipProps["color"] => {
        switch (true) {
          case lesson.grade < 30:
            return "danger";
          case lesson.grade >= 30 && lesson.grade < 60:
            return "primary";
          case lesson.grade >= 60:
            return "success";
          default:
            return "primary";
        }
      };

      if (lesson.grade === -1) return <>-</>;

      return (
        <Chip color={getChipColor()} size="sm">
          <span className="font-bold !text-[10px] md:text-sm">
            {lesson.grade}
          </span>
        </Chip>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="LicenseFileLessons.price" />
    ),
    cell: ({ row }) => <>{row.getValue("price")} DH</>,
  },
  {
    accessorKey: "duration",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="LicenseFileLessons.duration"
      />
    ),
    cell: ({ row }) => <>{row.getValue("duration")}h</>,
  },
  {
    accessorKey: "scheduledDate",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="LicenseFileLessons.scheduled-date"
      />
    ),
    cell: ({ row }) => {
      const lesson = licenseFileLessonSchema.parse(row.original);

      const date = moment(lesson.scheduledDate);

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
