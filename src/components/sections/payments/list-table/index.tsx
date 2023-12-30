'use client';

import { DataTable } from '@/components/organisms';
import { usePagination } from '@/lib/hooks/use-pagination';
import { useTableFilters } from '@/lib/hooks/use-table-filters';
import { api } from '@/utils/api';
import type { Paginated } from '@/components/organisms/data-table/types';

import { columns } from './columns';
import type { Payment } from './schema';

const PaymentsListTable = () => {
  const filters = useTableFilters();
  const pagination = usePagination();

  const { data, isLoading, error } = api.db.payments.query.list.useQuery<Paginated<Payment>>({
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

export default PaymentsListTable;
