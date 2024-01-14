'use client';

import { useTranslations } from 'next-intl';

import { DataTable } from '@/components/organisms/data-table';
import { usePagination } from '@/base/hooks/use-pagination';
import { useTableFilters } from '@/base/hooks/use-table-filters';
import { api } from '@/base/utils/server/api';
import type { Paginated } from '@/components/organisms/data-table/data-table.types';

import { columns } from './columns';
import type { StudentLesson } from './schema';
import type { StudentLessonsTableComponentType } from './types';

const StudentLessonsTable: StudentLessonsTableComponentType = ({ studentId }) => {
  const t = useTranslations('Dashboard.Dossier.Tables.StudentLessons');

  const pagination = usePagination({
    pageIndex: 0,
    pageSize: 2,
    pageCount: 0,
  });

  const filters = useTableFilters();

  const { data, isLoading, error } = api.db.lessons.query.listByStudentId.useQuery<Paginated<StudentLesson>>({
    studentId,
    pageIndex: pagination.get.pageIndex,
    pageSize: pagination.get.pageSize,
    filters: filters.get,
  });

  return (
    <div className="w-full">
      <h1 className="mb-4 w-full text-2xl font-bold">{t('title')}</h1>
      <DataTable
        data={data}
        error={error?.message}
        isLoading={isLoading}
        columns={columns}
        pagination={pagination}
        filters={filters}
      />
    </div>
  );
};

export default StudentLessonsTable;
