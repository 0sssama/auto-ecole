"use client";

import { DataTable } from "@/components/organisms";
import { Client } from "./schema";
import { api } from "@/utils/api";
import { columns } from "./columns";
import { usePagination } from "@/lib/hooks/usePagination";
import { Paginated } from "@/components/organisms/data-table/types";
import { useTableFilters } from "@/lib/hooks/useTableFilters";

function ClientsListTable() {
  const pagination = usePagination();
  const filters = useTableFilters();

  const { data, isLoading, error } = api.db.customers.query.list.useQuery<
    Paginated<Client>
  >({
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

export default ClientsListTable;
