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
import { instructorLessonSchema, type InstructorLesson } from './schema';

export const columns: ColumnDef<InstructorLesson>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="InstructorLessons.id" />,
    cell: ({ row }) => <>{row.getValue('id')}</>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'student-name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="InstructorLessons.student-name" />,
    cell: ({ row }) => {
      const instructorLesson = instructorLessonSchema.parse(row.original);

      return (
        <Link href={`/dash/admin/students?studentId=${instructorLesson.studentId}`}>
          <TooltipConcat className="text-left" text={instructorLesson.studentName} />
        </Link>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title="InstructorLessons.status" />,
    cell: function Cell({ row }) {
      const t = useTranslations('Dashboard.Dossier.Tables.InstructorLessons.Status');
      const instructorLesson = instructorLessonSchema.parse(row.original);

      return (
        <Badge variant={getLessonStatusBadgeVariant(instructorLesson.status)}>
          <span className="!text-[10px] font-bold md:text-sm">{t(instructorLesson.status)?.toUpperCase()}</span>
        </Badge>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'comment',
    header: ({ column }) => <DataTableColumnHeader column={column} title="InstructorLessons.comment" />,
    cell: ({ row }) => <TooltipConcat text={row.getValue('comment') || '-'} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'grade',
    header: ({ column }) => <DataTableColumnHeader column={column} title="InstructorLessons.grade" />,
    cell: ({ row }) => {
      const instructorLesson = instructorLessonSchema.parse(row.original);

      if (instructorLesson.grade === -1) return <>-</>;

      return (
        <Badge variant={getLessonGradeBadgeVariant(instructorLesson.grade)}>
          <span className="!text-[10px] font-bold md:text-sm">{instructorLesson.grade}</span>
        </Badge>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'price',
    header: ({ column }) => <DataTableColumnHeader column={column} title="InstructorLessons.price" />,
    cell: ({ row }) => <>{row.getValue('price')} DH</>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'duration',
    header: ({ column }) => <DataTableColumnHeader column={column} title="InstructorLessons.duration" />,
    cell: ({ row }) => <>{row.getValue('duration')}h</>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'scheduledDate',
    header: ({ column }) => <DataTableColumnHeader column={column} title="InstructorLessons.scheduled-date" />,
    cell: ({ row }) => {
      const instructorLesson = instructorLessonSchema.parse(row.original);
      const date = new Date(instructorLesson.scheduledDate);
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
