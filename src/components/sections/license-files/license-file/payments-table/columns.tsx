'use client';

import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import dayjs from 'dayjs';
import type { ColumnDef } from '@tanstack/react-table';

import DataTableColumnHeader from '@/components/organisms/data-table/column-header';
import { Tooltip, TooltipConcat } from '@/components/atoms';

import ActionsColumn from './actions-column';
import { licenseFilePaymentSchema, type LicenseFilePayment } from './schema';

export const columns: ColumnDef<LicenseFilePayment>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="LicenseFilePayments.id" />,
    cell: ({ row }) => <>{row.getValue('id')}</>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'admin-name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="LicenseFilePayments.admin-name" />,
    cell: ({ row }) => {
      const licenseFilePayment = licenseFilePaymentSchema.parse(row.original);

      return <TooltipConcat text={licenseFilePayment.adminName} />;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'sum',
    header: ({ column }) => <DataTableColumnHeader column={column} title="LicenseFilePayments.sum" />,
    cell: ({ row }) => <>{row.getValue('sum')} DH</>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'comment',
    header: ({ column }) => <DataTableColumnHeader column={column} title="LicenseFilePayments.comment" />,
    cell: ({ row }) => <TooltipConcat text={row.getValue('comment') || '-'} maxLength={20} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'date',
    header: ({ column }) => <DataTableColumnHeader column={column} title="LicenseFilePayments.date" />,
    cell: ({ row }) => {
      const licenseFilePayment = licenseFilePaymentSchema.parse(row.original);
      dayjs.extend(relativeTime);
      dayjs.extend(localizedFormat);
      const date = dayjs(licenseFilePayment.date);

      return <Tooltip content={date.fromNow()}>{date.fromNow()}</Tooltip>;
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
