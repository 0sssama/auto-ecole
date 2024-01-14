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
import { getExamStatusBadgeVariant } from '@/base/utils/client/get-badge-variant';

import ActionsColumn from './actions-column';
import { licenseFileExamSchema, type LicenseFileExam } from './schema';

export const columns: ColumnDef<LicenseFileExam>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="LicenseFileExams.id" />,
    cell: ({ row }) => <>{row.getValue('id')}</>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'type',
    header: ({ column }) => <DataTableColumnHeader column={column} title="LicenseFileExams.type" />,
    cell: function Cell({ row }) {
      const exam = licenseFileExamSchema.parse(row.original);
      const t = useTranslations('Dashboard.Files.LicenseFiles.FilePage.LicenseFileExams.Type');

      return <p>{t(exam.type)}</p>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title="LicenseFileExams.status" />,
    cell: function Cell({ row }) {
      const exam = licenseFileExamSchema.parse(row.original);
      const t = useTranslations('Dashboard.Files.LicenseFiles.FilePage.LicenseFileExams.Status');

      return (
        <Badge variant={getExamStatusBadgeVariant(exam.status)}>
          <span className="!text-[10px] font-bold md:text-sm">{t(exam.status)}</span>
        </Badge>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'date',
    header: ({ column }) => <DataTableColumnHeader column={column} title="LicenseFileExams.date" />,
    cell: ({ row }) => {
      const exam = licenseFileExamSchema.parse(row.original);
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
