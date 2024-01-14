'use client';

import { DataTable } from '@/components/organisms/data-table';
import { api } from '@/base/utils/server/api';
import { usePagination } from '@/base/hooks/use-pagination';
import { useTableFilters } from '@/base/hooks/use-table-filters';
import type { Paginated } from '@/components/organisms/data-table/data-table.types';

import { columns } from './columns';
import type { Lesson } from './schema';

const LessonsListTable = () => {
  const pagination = usePagination();
  const filters = useTableFilters();

  const { data, isLoading, error } = api.db.lessons.query.list.useQuery<Paginated<Lesson>>({
    pageIndex: pagination.get.pageIndex,
    pageSize: pagination.get.pageSize,
    filters: filters.get,
  });

  return (
    <div className="w-full">
      <DataTable
        data={data}
        error={error?.message}
        isLoading={isLoading}
        columns={columns}
        pagination={pagination}
        filters={filters}
        filtersAllowed={{
          search: true,
        }}
      />
    </div>
  );
};

export default LessonsListTable;
