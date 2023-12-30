'use client';

import Link from 'next/link';
import { formatDistanceToNow, format } from 'date-fns';
import { Chip } from '@nextui-org/chip';
import { useTranslations } from 'next-intl';
import type { ColumnDef } from '@tanstack/react-table';

import DataTableColumnHeader from '@/components/organisms/data-table/column-header';
import { Tooltip } from '@/components/atoms';
import { getExamStatusChipColor } from '@/base/utils/client/get-chip-colors';

import ActionsColumn from './actions-column';
import { examSchema, type Exam } from './schema';

export const columns: ColumnDef<Exam>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Exams.id" />,
    cell: ({ row }) => <>{row.getValue('id')}</>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'student-name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Exams.student-name" />,
    cell: ({ row }) => {
      const exam = examSchema.parse(row.original);

      return <Link href={`/dash/admin/students?studentId=${exam.student.id}`}>{exam.student.fullName}</Link>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'type',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Exams.type" />,
    cell: function Cell({ row }) {
      const exam = examSchema.parse(row.original);
      const t = useTranslations('Dashboard.Files.Exams.ListTable.Type');

      return <p>{t(exam.type)}</p>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Exams.status" />,
    cell: function Cell({ row }) {
      const exam = examSchema.parse(row.original);
      const t = useTranslations('Dashboard.Files.Exams.ListTable.Status');

      return (
        <Chip color={getExamStatusChipColor(exam.status)} size="sm">
          <span className="!text-[10px] font-bold md:text-sm">{t(exam.status)}</span>
        </Chip>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'date',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Exams.date" />,
    cell: ({ row }) => {
      const exam = examSchema.parse(row.original);
      const date = new Date(exam.date);
      const relativeTime = formatDistanceToNow(date, { addSuffix: true });

      return <Tooltip content={format(date, "EEEE, LLLL do, yyyy 'at' h:mm a")}>{relativeTime}</Tooltip>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <div className="flex items-center justify-end">
        <ActionsColumn row={row} />
      </div>
    ),
  },
];
