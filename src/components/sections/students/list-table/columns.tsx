'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Chip } from '@nextui-org/chip';
import type { ColumnDef } from '@tanstack/react-table';

import DataTableColumnHeader from '@/components/organisms/data-table/column-header';
import { getStudentStatusChipColor } from '@/lib/get-chip-colors';

import ActionsColumn from './data-table-row-actions';
import { studentSchema, type Student } from './schema';

export const columns: ColumnDef<Student>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Students.id" />,
    cell: ({ row }) => <>{row.getValue('id')}</>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Students.name" />,
    cell: function Cell({ row }) {
      const t = useTranslations('Dashboard.Users.Students.ListStudentsTable');
      const student = studentSchema.parse(row.original);

      return (
        <Link className="flex space-x-2" href={`/dash/admin/students?studentId=${student.id}`}>
          <span className="max-w-[500px] truncate font-medium">{row.getValue('name')}</span>
          {student.archived && (
            <Chip color="default" size="sm" className="!py-0">
              <span className="!text-[10px] font-bold md:text-sm">{t('archived')?.toUpperCase()}</span>
            </Chip>
          )}
        </Link>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Students.status" />,
    cell: function Cell({ row }) {
      const t = useTranslations('Dashboard.Users.Students.ListStudentsTable.Status');
      const student = studentSchema.parse(row.original);

      return (
        <Chip color={getStudentStatusChipColor(student.status)} size="sm">
          <span className="!text-[10px] font-bold md:text-sm">{t(student.status)?.toUpperCase()}</span>
        </Chip>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'category',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Students.category" />,
    cell: function Cell({ row }) {
      const t = useTranslations('Dashboard.Users.Students.ListStudentsTable.Category');
      const { category } = studentSchema.parse(row.original);

      return <>{category ? `${t(category)} (${category})` : '-'}</>;
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
