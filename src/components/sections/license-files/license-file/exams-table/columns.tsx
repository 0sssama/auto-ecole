'use client';

import moment from 'moment';
import { Chip } from '@nextui-org/chip';
import { useTranslations } from 'next-intl';
import type { ColumnDef } from '@tanstack/react-table';

import DataTableColumnHeader from '@/components/organisms/data-table/column-header';
import { Tooltip } from '@/components/atoms';
import { getExamStatusChipColor } from '@/base/utils/client/get-chip-colors';

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
    header: ({ column }) => <DataTableColumnHeader column={column} title="LicenseFileExams.date" />,
    cell: ({ row }) => {
      const exam = licenseFileExamSchema.parse(row.original);
      const date = moment(exam.date);

      return <Tooltip content={date.calendar()}>{date.fromNow()}</Tooltip>;
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
