'use client';

import moment from 'moment';
import type { ColumnDef } from '@tanstack/react-table';

import DataTableColumnHeader from '@/components/organisms/data-table/column-header';
import { Tooltip, TooltipConcat } from '@/components/atoms';

import ActionsColumn from './actions-column';
import { licenseFileExpenseSchema, type LicenseFileExpense } from './schema';

export const columns: ColumnDef<LicenseFileExpense>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="LicenseFileExpenses.id" />,
    cell: ({ row }) => <>{row.getValue('id')}</>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'admin-name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="LicenseFileExpenses.admin-name" />,
    cell: ({ row }) => {
      const licenseFileExpense = licenseFileExpenseSchema.parse(row.original);

      return <TooltipConcat text={licenseFileExpense.adminName} />;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'sum',
    header: ({ column }) => <DataTableColumnHeader column={column} title="LicenseFileExpenses.sum" />,
    cell: ({ row }) => <>{row.getValue('sum')} DH</>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'comment',
    header: ({ column }) => <DataTableColumnHeader column={column} title="LicenseFileExpenses.comment" />,
    cell: ({ row }) => <TooltipConcat text={row.getValue('comment') || '-'} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'date',
    header: ({ column }) => <DataTableColumnHeader column={column} title="LicenseFileExpenses.date" />,
    cell: ({ row }) => {
      const licenseFileExpense = licenseFileExpenseSchema.parse(row.original);
      const date = moment(licenseFileExpense.date);

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
