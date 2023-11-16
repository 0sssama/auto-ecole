"use client";

import moment from "moment";

import { DataTableColumnHeader } from "@/components/organisms/data-table/column-header";
import { ActionsColumn } from "./actions-column";
import { instructorSchema } from "./schema";

import type { ColumnDef } from "@tanstack/react-table";
import type { Instructor } from "./schema";
import Link from "next/link";

export const columns: ColumnDef<Instructor>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Instructors.id" />
    ),
    cell: ({ row }) => <>{row.getValue("id")}</>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "full-name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Instructors.full-name" />
    ),
    cell: function Cell({ row }) {
      const instructor = instructorSchema.parse(row.original);

      return (
        <Link
          className="flex space-x-2"
          href={`/dash/admin/instructors?instructorId=${instructor.id}`}
        >
          <span className="max-w-[500px] truncate font-medium">
            {instructor.fullName}
          </span>
        </Link>
      );
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Instructors.phone" />
    ),
    cell: ({ row }) => {
      const instructor = instructorSchema.parse(row.original);

      return <>{instructor.phone}</>;
    },
  },
  {
    accessorKey: "license-files-count",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Instructors.license-files-count"
      />
    ),
    cell: ({ row }) => {
      const instructor = instructorSchema.parse(row.original);

      return <>{instructor.licenseFilesCount}</>;
    },
  },
  {
    accessorKey: "lessons-count",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Instructors.lessons-count"
      />
    ),
    cell: ({ row }) => {
      const instructor = instructorSchema.parse(row.original);

      return <>{instructor.lessonsCount}</>;
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Instructors.date" />
    ),
    cell: ({ row }) => {
      const studentPayment = instructorSchema.parse(row.original);

      return <>{moment(studentPayment.createdAt).fromNow()}</>;
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
