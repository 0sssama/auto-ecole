'use client';

// eslint-disable-next-line import/no-duplicates
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
// eslint-disable-next-line import/no-duplicates
import format from 'date-fns/format';
import { useTranslations } from 'next-intl';
import type { ColumnDef } from '@tanstack/react-table';

import { Badge } from '@/components/ui/badge';
import DataTableColumnHeader from '@/components/organisms/data-table/components/column-header';
import { Tooltip } from '@/components/atoms/tooltip';
import { TooltipConcat } from '@/components/atoms/tooltip-concat';
import { getLessonGradeBadgeVariant, getLessonStatusBadgeVariant } from '@/base/utils/client/get-badge-variant';

import ActionsColumn from './actions-column';
import { licenseFileLessonSchema, type LicenseFileLesson } from './schema';

export const columns: ColumnDef<LicenseFileLesson>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="LicenseFileLessons.id" />,
    cell: ({ row }) => <>{row.getValue('id')}</>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title="LicenseFileLessons.status" />,
    cell: function Cell({ row }) {
      const t = useTranslations('Dashboard.Files.LicenseFiles.FilePage.LicenseFileLessons.Status');
      const lesson = licenseFileLessonSchema.parse(row.original);

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
    accessorKey: 'comment',
    header: ({ column }) => <DataTableColumnHeader column={column} title="LicenseFileLessons.comment" />,
    cell: ({ row }) => <TooltipConcat text={row.getValue('comment') || '-'} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'grade',
    header: ({ column }) => <DataTableColumnHeader column={column} title="LicenseFileLessons.grade" />,
    cell: ({ row }) => {
      const lesson = licenseFileLessonSchema.parse(row.original);

      if (lesson.grade === -1) return <>-</>;

      return (
        <Badge variant={getLessonGradeBadgeVariant(lesson.grade)}>
          <span className="!text-[10px] font-bold md:text-sm">{lesson.grade}</span>
        </Badge>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'price',
    header: ({ column }) => <DataTableColumnHeader column={column} title="LicenseFileLessons.price" />,
    cell: ({ row }) => <>{row.getValue('price')} DH</>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'duration',
    header: ({ column }) => <DataTableColumnHeader column={column} title="LicenseFileLessons.duration" />,
    cell: ({ row }) => <>{row.getValue('duration')}h</>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'scheduledDate',
    header: ({ column }) => <DataTableColumnHeader column={column} title="LicenseFileLessons.scheduled-date" />,
    cell: ({ row }) => {
      const lesson = licenseFileLessonSchema.parse(row.original);
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
