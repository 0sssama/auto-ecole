'use client';

import { useTranslations } from 'next-intl';

import { DataTable } from '@/components/organisms/data-table';
import type { Paginated } from '@/components/organisms/data-table/data-table.types';
import { usePagination } from '@/base/hooks/use-pagination';
import { useTableFilters } from '@/base/hooks/use-table-filters';
import { api } from '@/base/utils/server/api';

import { columns } from './columns';
import type { InstructorLesson } from './schema';
import type { InstructorLessonsTableComponentType } from './types';

const InstructorLessonsTable: InstructorLessonsTableComponentType = ({ instructorId }) => {
  const t = useTranslations('Dashboard.Dossier.Tables.InstructorLessons');

  const pagination = usePagination({
    pageIndex: 0,
    pageSize: 2,
    pageCount: 0,
  });

  const filters = useTableFilters();

  const { data, isLoading, error } = api.db.lessons.query.listByInstructorId.useQuery<Paginated<InstructorLesson>>({
    instructorId,
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

export default InstructorLessonsTable;
