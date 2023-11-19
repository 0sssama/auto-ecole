"use client";

import { DataTable } from "@/components/organisms";
import { usePagination } from "@/lib/hooks/usePagination";
import { useTableFilters } from "@/lib/hooks/useTableFilters";
import { api } from "@/utils/api";
import { columns } from "./columns";

import type { LicenseFile } from "./schema";
import type { Paginated } from "@/components/organisms/data-table/types";

export default function LicenseFilesListTable() {
  const pagination = usePagination();
  const filters = useTableFilters();

  const { data, isLoading, error } = api.db.licenseFiles.query.list.useQuery<
    Paginated<LicenseFile>
  >({
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
}
