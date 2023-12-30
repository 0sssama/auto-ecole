'use client';

import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { useTranslations } from 'next-intl';
import { Chip } from '@nextui-org/chip';
import type { ColumnDef } from '@tanstack/react-table';

import DataTableColumnHeader from '@/components/organisms/data-table/column-header';
import { Tooltip, TooltipConcat } from '@/components/atoms';
import { getLicenseFileStatusChipColor } from '@/base/utils/client/get-chip-colors';

import ActionsColumn from './actions-column';
import { instructorLicenseFileSchema, type InstructorLicenseFile } from './schema';

export const columns: ColumnDef<InstructorLicenseFile>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="InstructorLicenseFiles.id" />,
    cell: ({ row }) => <>{row.getValue('id')}</>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'student-name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="InstructorLicenseFiles.student-name" />,
    cell: ({ row }) => {
      const licenseFile = instructorLicenseFileSchema.parse(row.original);

      return (
        <Link href={`/dash/admin/license-files?licenseFileId=${licenseFile.id}`} className="flex h-full w-full">
          <TooltipConcat className="text-left" text={licenseFile.studentName} />
        </Link>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'category',
    header: ({ column }) => <DataTableColumnHeader column={column} title="InstructorLicenseFiles.category" />,
    cell: function Cell({ row }) {
      const t = useTranslations('Dashboard.Dossier.Tables.InstructorLicenseFiles.Category');
      const licenseFile = instructorLicenseFileSchema.parse(row.original);

      return (
        <Link href={`/dash/admin/license-files?licenseFileId=${licenseFile.id}`} className="flex h-full w-full">
          {t(licenseFile.category)} ({licenseFile.category})
        </Link>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'price',
    header: ({ column }) => <DataTableColumnHeader column={column} title="InstructorLicenseFiles.price" />,
    cell: ({ row }) => {
      const licenseFile = instructorLicenseFileSchema.parse(row.original);

      return (
        <Link href={`/dash/admin/license-files?licenseFileId=${licenseFile.id}`} className="flex h-full w-full">
          {row.getValue('price')} DH
        </Link>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title="InstructorLicenseFiles.status" />,
    cell: function Cell({ row }) {
      const t = useTranslations('Dashboard.Dossier.Tables.InstructorLicenseFiles.Status');
      const licenseFile = instructorLicenseFileSchema.parse(row.original);

      return (
        <Link href={`/dash/admin/license-files?licenseFileId=${licenseFile.id}`} className="flex h-full w-full">
          <Chip color={getLicenseFileStatusChipColor(licenseFile.status)} size="sm">
            <span className="!text-[10px] font-bold md:text-sm">{t(licenseFile.status)?.toUpperCase()}</span>
          </Chip>
        </Link>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title="InstructorLicenseFiles.created-at" />,
    cell: ({ row }) => {
      const licenseFile = instructorLicenseFileSchema.parse(row.original);
      const date = new Date(licenseFile.createdAt);
      const relativeTime = formatDistanceToNow(date);
      return (
        <Link href={`/dash/admin/license-files?licenseFileId=${licenseFile.id}`} className="flex h-full w-full">
          <Tooltip content={relativeTime}>{relativeTime}</Tooltip>
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
