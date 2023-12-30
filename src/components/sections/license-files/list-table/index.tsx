'use client';

import { DataTable } from '@/components/organisms';
import { usePagination } from '@/lib/hooks/use-pagination';
import { useTableFilters } from '@/lib/hooks/use-table-filters';
import { api } from '@/utils/api';
import type { Paginated } from '@/components/organisms/data-table/types';

import { columns } from './columns';
import type { LicenseFile } from './schema';

const LicenseFilesListTable = () => {
  const pagination = usePagination();
  const filters = useTableFilters();

  const { data, isLoading, error } = api.db.licenseFiles.query.list.useQuery<Paginated<LicenseFile>>({
    pageIndex: pagination.get.pageIndex,
    pageSize: pagination.get.pageSize,
    filters: filters.get,
  });

  return (
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
  );
};

export default LicenseFilesListTable;
