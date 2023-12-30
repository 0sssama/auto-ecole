'use client';

import { formatDistanceToNow } from 'date-fns';
import { Chip } from '@nextui-org/chip';
import { useTranslations } from 'next-intl';
import type { ColumnDef } from '@tanstack/react-table';

import DataTableColumnHeader from '@/components/organisms/data-table/column-header';
import { Tooltip, TooltipConcat } from '@/components/atoms';
import { getLessonGradeChipColor, getLessonStatusChipColor } from '@/base/utils/client/get-chip-colors';

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
        <Chip color={getLessonStatusChipColor(lesson.status)} size="sm">
          <span className="!text-[10px] font-bold md:text-sm">{t(lesson.status)?.toUpperCase()}</span>
        </Chip>
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
        <Chip color={getLessonGradeChipColor(lesson.grade)} size="sm">
          <span className="!text-[10px] font-bold md:text-sm">{lesson.grade}</span>
        </Chip>
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
      const relativeTime = formatDistanceToNow(date);

      return <Tooltip content={relativeTime}>{relativeTime}</Tooltip>;
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
