'use client';

// eslint-disable-next-line import/no-duplicates
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
// eslint-disable-next-line import/no-duplicates
import format from 'date-fns/format';
import { useTranslations } from 'next-intl';
import type { ColumnDef } from '@tanstack/react-table';

import { Link } from '@/components/atoms/link';
import { Badge } from '@/components/ui/badge';
import DataTableColumnHeader from '@/components/organisms/data-table/column-header';
import { Tooltip } from '@/components/atoms/tooltip';
import { TooltipConcat } from '@/components/atoms/tooltip-concat';
import { getLicenseFileStatusBadgeVariant } from '@/base/utils/client/get-badge-variant';

import ActionsColumn from './actions-column';
import { studentLicenseFileSchema, type StudentLicenseFile } from './schema';

export const columns: ColumnDef<StudentLicenseFile>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="StudentLicenseFiles.id" />,
    cell: ({ row }) => <>{row.getValue('id')}</>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'instructor-name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="StudentLessons.instructor-name" />,
    cell: ({ row }) => {
      const studentLicenseFile = studentLicenseFileSchema.parse(row.original);

      return (
        <Link href={`/dash/admin/license-files?licenseFileId=${studentLicenseFile.id}`} className="flex h-full w-full">
          <TooltipConcat text={studentLicenseFile.instructorName} />
        </Link>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'category',
    header: ({ column }) => <DataTableColumnHeader column={column} title="StudentLicenseFiles.category" />,
    cell: function Cell({ row }) {
      const t = useTranslations('Dashboard.Dossier.Tables.StudentLicenseFiles.Category');
      const studentLicenseFile = studentLicenseFileSchema.parse(row.original);

      return (
        <Link href={`/dash/admin/license-files?licenseFileId=${studentLicenseFile.id}`} className="flex h-full w-full">
          {t(studentLicenseFile.category)} ({studentLicenseFile.category})
        </Link>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'price',
    header: ({ column }) => <DataTableColumnHeader column={column} title="StudentLicenseFiles.price" />,
    cell: ({ row }) => {
      const studentLicenseFile = studentLicenseFileSchema.parse(row.original);

      return (
        <Link href={`/dash/admin/license-files?licenseFileId=${studentLicenseFile.id}`} className="flex h-full w-full">
          {row.getValue('price')} DH
        </Link>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title="StudentLicenseFiles.status" />,
    cell: function Cell({ row }) {
      const t = useTranslations('Dashboard.Dossier.Tables.StudentLicenseFiles.Status');
      const studentLicenseFile = studentLicenseFileSchema.parse(row.original);

      return (
        <Link href={`/dash/admin/license-files?licenseFileId=${studentLicenseFile.id}`} className="flex h-full w-full">
          <Badge variant={getLicenseFileStatusBadgeVariant(studentLicenseFile.status)}>
            <span className="!text-[10px] font-bold md:text-sm">{t(studentLicenseFile.status)?.toUpperCase()}</span>
          </Badge>
        </Link>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title="StudentLicenseFiles.created-at" />,
    cell: ({ row }) => {
      const studentLicenseFile = studentLicenseFileSchema.parse(row.original);
      const date = new Date(studentLicenseFile.createdAt);
      const relativeTime = formatDistanceToNow(date, { addSuffix: true });

      return (
        <Link href={`/dash/admin/license-files?licenseFileId=${studentLicenseFile.id}`} className="flex h-full w-full">
          <Tooltip content={format(date, "EEEE, LLLL do, yyyy 'at' h:mm a")}>{relativeTime}</Tooltip>
        </Link>
      );
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
