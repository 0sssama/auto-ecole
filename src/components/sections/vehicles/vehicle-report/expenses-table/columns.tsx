'use client';

import { formatDistanceToNow } from 'date-fns';
import type { ColumnDef } from '@tanstack/react-table';

import DataTableColumnHeader from '@/components/organisms/data-table/column-header';
import { Tooltip, TooltipConcat } from '@/components/atoms';

import ActionsColumn from './actions-column';
import { vehicleExpenseSchema, type VehicleExpense } from './schema';

export const columns: ColumnDef<VehicleExpense>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="VehicleExpenses.id" />,
    cell: ({ row }) => <>{row.getValue('id')}</>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'admin-name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="VehicleExpenses.admin-name" />,
    cell: ({ row }) => {
      const vehicleExpense = vehicleExpenseSchema.parse(row.original);

      return <TooltipConcat text={vehicleExpense.adminName} />;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'sum',
    header: ({ column }) => <DataTableColumnHeader column={column} title="VehicleExpenses.sum" />,
    cell: ({ row }) => <>{row.getValue('sum')} DH</>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'comment',
    header: ({ column }) => <DataTableColumnHeader column={column} title="VehicleExpenses.comment" />,
    cell: ({ row }) => <TooltipConcat text={row.getValue('comment') || '-'} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'date',
    header: ({ column }) => <DataTableColumnHeader column={column} title="VehicleExpenses.date" />,
    cell: ({ row }) => {
      const vehicleExpense = vehicleExpenseSchema.parse(row.original);
      const date = new Date(vehicleExpense.date);
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
