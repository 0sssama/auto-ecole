'use client';

import { DataTable } from '@/components/organisms';
import { api } from '@/base/utils/server/api';
import { usePagination } from '@/base/hooks/use-pagination';
import { useTableFilters } from '@/base/hooks/use-table-filters';
import { useTableStatus } from '@/base/hooks/use-license-file-status';
import type { Paginated } from '@/components/organisms/data-table/types';

import type { Student } from './schema';
import { columns } from './columns';

function StudentsListTable() {
  const pagination = usePagination();
  const filters = useTableFilters();
  const status = useTableStatus();

  const { data, isLoading, error } = api.db.students.query.list.useQuery<Paginated<Student>>({
    pageIndex: pagination.get.pageIndex,
    pageSize: pagination.get.pageSize,
    status: status.get,
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
        status={status}
        filters={filters}
        filtersAllowed={{
          search: true,
        }}
      />
    </div>
  );
}

export default StudentsListTable;
