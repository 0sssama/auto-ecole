'use client';

// eslint-disable-next-line import/no-duplicates
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
// eslint-disable-next-line import/no-duplicates
import format from 'date-fns/format';
import type { ColumnDef } from '@tanstack/react-table';

import DataTableColumnHeader from '@/components/organisms/data-table/column-header';
import { Tooltip } from '@/components/atoms/tooltip';
import { TooltipConcat } from '@/components/atoms/tooltip-concat';

import ActionsColumn from './actions-column';
import { paymentSchema, type Payment } from './schema';

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Payments.id" />,
    cell: ({ row }) => <>{row.getValue('id')}</>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'admin-name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Payments.admin-name" />,
    cell: ({ row }) => {
      const payment = paymentSchema.parse(row.original);

      return <TooltipConcat text={payment.adminName} />;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'sum',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Payments.sum" />,
    cell: ({ row }) => <>{row.getValue('sum')} DH</>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'comment',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Payments.comment" />,
    cell: ({ row }) => <TooltipConcat text={row.getValue('comment') || '-'} maxLength={20} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'date',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Payments.date" />,
    cell: ({ row }) => {
      const payment = paymentSchema.parse(row.original);
      const date = new Date(payment.date);
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
