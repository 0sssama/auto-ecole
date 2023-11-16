"use client";

import { DataTable } from "@/components/organisms";
import { api } from "@/utils/api";
import { columns } from "./columns";
import { usePagination } from "@/lib/hooks/usePagination";
import { useTableFilters } from "@/lib/hooks/useTableFilters";

import type { Student } from "./schema";
import type { Paginated } from "@/components/organisms/data-table/types";

function StudentsListTable() {
  const pagination = usePagination();
  const filters = useTableFilters();

  const { data, isLoading, error } = api.db.students.query.list.useQuery<
    Paginated<Student>
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

export default StudentsListTable;
