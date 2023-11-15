"use client";

import { DataTable } from "@/components/organisms";
import { Instructor } from "./schema";
import { api } from "@/utils/api";
import { columns } from "./columns";
import { usePagination } from "@/lib/hooks/usePagination";
import { Paginated } from "@/components/organisms/data-table/types";
import { useTableFilters } from "@/lib/hooks/useTableFilters";

function InstructorsListTable() {
  const pagination = usePagination();
  const filters = useTableFilters();

  const { data, isLoading, error } = api.db.instructors.query.list.useQuery<
    Paginated<Instructor>
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

export default InstructorsListTable;
