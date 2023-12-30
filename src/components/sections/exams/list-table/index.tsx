'use client';

import { DataTable } from '@/components/organisms';
import { api } from '@/base/utils/server/api';
import { usePagination } from '@/base/hooks/use-pagination';
import { useTableFilters } from '@/base/hooks/use-table-filters';
import type { Paginated } from '@/components/organisms/data-table/types';

import { columns } from './columns';
import type { Exam } from './schema';

function ExamsListTable() {
  const pagination = usePagination();
  const filters = useTableFilters();

  const { data, isLoading, error } = api.db.exams.query.list.useQuery<Paginated<Exam>>({
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
}

export default ExamsListTable;
