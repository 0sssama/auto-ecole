'use client';

import Link from 'next/link';
// eslint-disable-next-line import/no-duplicates
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
// eslint-disable-next-line import/no-duplicates
import format from 'date-fns/format';
import { useTranslations } from 'next-intl';
import type { ColumnDef } from '@tanstack/react-table';

import { Badge } from '@/components/ui/badge';
import DataTableColumnHeader from '@/components/organisms/data-table/column-header';
import { Tooltip, TooltipConcat } from '@/components/atoms';
import { getLessonStatusBadgeVariant } from '@/base/utils/client/get-badge-variant';

import ActionsColumn from './actions-column';
import { lessonSchema, type Lesson } from './schema';

export const columns: ColumnDef<Lesson>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Lessons.id" />,
    cell: ({ row }) => <>{row.getValue('id')}</>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'student-name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Lessons.student-name" />,
    cell: ({ row }) => {
      const lesson = lessonSchema.parse(row.original);

      return (
        <Link href={`/dash/admin/students?studentId=${lesson.student.id}`}>
          <TooltipConcat className="text-left" text={lesson.student.fullName} />
        </Link>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'instructor-name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Lessons.instructor-name" />,
    cell: ({ row }) => {
      const lesson = lessonSchema.parse(row.original);

      return (
        <Link href={`/dash/admin/instructors?instructorId=${lesson.instructor.id}`}>
          <TooltipConcat className="text-left" text={lesson.instructor.fullName} />
        </Link>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Lessons.status" />,
    cell: function Cell({ row }) {
      const t = useTranslations('Dashboard.Files.Lessons.ListTable.Status');
      const lesson = lessonSchema.parse(row.original);

      return (
        <Badge variant={getLessonStatusBadgeVariant(lesson.status)}>
          <span className="!text-[10px] font-bold md:text-sm">{t(lesson.status)?.toUpperCase()}</span>
        </Badge>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'price',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Lessons.price" />,
    cell: ({ row }) => <>{row.getValue('price')} DH</>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'duration',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Lessons.duration" />,
    cell: ({ row }) => <>{row.getValue('duration')}h</>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'scheduledDate',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Lessons.scheduled-date" />,
    cell: ({ row }) => {
      const lesson = lessonSchema.parse(row.original);
      const date = new Date(lesson.scheduledDate);
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
