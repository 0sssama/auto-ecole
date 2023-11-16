"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { Chip, ChipProps } from "@nextui-org/chip";

import { DataTableColumnHeader } from "@/components/organisms/data-table/column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Student, studentSchema } from "./schema";

export const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Students.id" />
    ),
    cell: ({ row }) => <>{row.getValue("id")}</>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Students.name" />
    ),
    cell: function Cell({ row }) {
      const t = useTranslations("Dashboard.Users.Students.ListStudentsTable");
      const student = studentSchema.parse(row.original);

      return (
        <Link
          className="flex space-x-2"
          href={`/dash/admin/students?studentId=${student.id}`}
        >
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("name")}
          </span>
          {student.archived && (
            <Chip color="default" size="sm" className="!py-0">
              <span className="font-bold !text-[10px] md:text-sm">
                {t("archived")?.toUpperCase()}
              </span>
            </Chip>
          )}
        </Link>
      );
    },
  },
  {
    id: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Students.status" />
    ),
    cell: function Cell({ row }) {
      const t = useTranslations(
        "Dashboard.Users.Students.ListStudentsTable.Status",
      );
      const student = studentSchema.parse(row.original);

      const getChipColor = (): ChipProps["color"] => {
        switch (student.status) {
          case "active":
            return "secondary";
          case "finished":
            return "success";
          case "not-started":
            return "primary";
          case "rejected":
            return "danger";
          default:
            return "primary";
        }
      };

      return (
        <Chip color={getChipColor()} size="sm">
          <span className="font-bold !text-[10px] md:text-sm">
            {t(student.status)?.toUpperCase()}
          </span>
        </Chip>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Students.created-at" />
    ),
    cell: ({ row }) => {
      const student = studentSchema.parse(row.original);

      return <>{moment(student.createdAt).fromNow()}</>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex items-center justify-end">
        <DataTableRowActions row={row} />
      </div>
    ),
  },
];