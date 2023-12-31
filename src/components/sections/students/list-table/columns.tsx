'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import type { ColumnDef } from '@tanstack/react-table';

import DataTableColumnHeader from '@/components/organisms/data-table/column-header';
import { getStudentStatusBadgeVariant } from '@/base/utils/client/get-badge-variant';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

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
        <Link className="flex items-center space-x-2" href={`/dash/admin/students?studentId=${student.id}`}>
          <Avatar className="h-9 w-9">
            <AvatarImage src={student.profilePicture} alt={student.name} />
            <AvatarFallback>{student.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="truncate text-sm font-medium leading-none">{student.name}</p>
            <p className="text-sm text-muted-foreground">{student.cin}</p>
          </div>
          {student.archived && (
            <Badge variant="default" className="!py-0">
              <span className="!text-[10px] font-bold md:text-sm">{t('archived')?.toUpperCase()}</span>
            </Badge>
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
        <Badge variant={getStudentStatusBadgeVariant(student.status)}>
          <span className="!text-[10px] font-bold md:text-sm">{t(student.status)?.toUpperCase()}</span>
        </Badge>
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
