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
import { getLessonGradeBadgeVariant, getLessonStatusBadgeVariant } from '@/base/utils/client/get-chip-colors';

import ActionsColumn from './actions-column';
import { studentLessonSchema, type StudentLesson } from './schema';

export const columns: ColumnDef<StudentLesson>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="StudentLessons.id" />,
    cell: ({ row }) => <>{row.getValue('id')}</>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'instructor-name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="StudentLessons.instructor-name" />,
    cell: ({ row }) => {
      const studentLesson = studentLessonSchema.parse(row.original);

      return (
        <Link href={`/dash/admin/instructors?instructorId=${studentLesson.instructorId}`}>
          <TooltipConcat text={studentLesson.instructorName} />
        </Link>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title="StudentLessons.status" />,
    cell: function Cell({ row }) {
      const t = useTranslations('Dashboard.Dossier.Tables.StudentLessons.Status');
      const studentLesson = studentLessonSchema.parse(row.original);

      return (
        <Badge variant={getLessonStatusBadgeVariant(studentLesson.status)}>
          <span className="!text-[10px] font-bold md:text-sm">{t(studentLesson.status)?.toUpperCase()}</span>
        </Badge>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'comment',
    header: ({ column }) => <DataTableColumnHeader column={column} title="StudentLessons.comment" />,
    cell: ({ row }) => <TooltipConcat text={row.getValue('comment') || '-'} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'grade',
    header: ({ column }) => <DataTableColumnHeader column={column} title="StudentLessons.grade" />,
    cell: ({ row }) => {
      const studentLesson = studentLessonSchema.parse(row.original);

      if (studentLesson.grade === -1) return <>-</>;

      return (
        <Badge variant={getLessonGradeBadgeVariant(studentLesson.grade)}>
          <span className="!text-[10px] font-bold md:text-sm">{studentLesson.grade}</span>
        </Badge>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'price',
    header: ({ column }) => <DataTableColumnHeader column={column} title="StudentLessons.price" />,
    cell: ({ row }) => <>{row.getValue('price')} DH</>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'duration',
    header: ({ column }) => <DataTableColumnHeader column={column} title="StudentLessons.duration" />,
    cell: ({ row }) => <>{row.getValue('duration')}h</>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'scheduledDate',
    header: ({ column }) => <DataTableColumnHeader column={column} title="StudentLessons.scheduled-date" />,
    cell: ({ row }) => {
      const studentLesson = studentLessonSchema.parse(row.original);
      const date = new Date(studentLesson.scheduledDate);
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
