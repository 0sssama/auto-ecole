"use client";

import { DataTable } from "@/components/organisms";
import { Client } from "./schema";
import { api } from "@/utils/api";
import { columns } from "./columns";
import { useTranslations } from "next-intl";
import { Spinner } from "@/components/atoms";
import { usePagination } from "@/lib/hooks/usePagination";
import { useEffect } from "react";
import { Paginated } from "@/components/organisms/data-table/types";

function ClientsListTable() {
  const t = useTranslations("Dashboard.Users.ListClientsTable");
  const pagination = usePagination();

  const { data, isLoading, error } = api.db.customers.query.list.useQuery<
    Paginated<Client>
  >({
    pageIndex: pagination.get.pageIndex,
    pageSize: pagination.get.pageSize,
  });

  useEffect(() => {
    if (!data) return;

    pagination.set.pageCount(data.pageCount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div className="w-full">
      {(error || isLoading) && (
        <div className="w-full min-h-[300px] flex items-center justify-center">
          {error && t("error")}
          {isLoading && <Spinner size="md" />}
        </div>
      )}

      {data && (
        <DataTable data={data.data} columns={columns} pagination={pagination} />
      )}
    </div>
  );
}

export default ClientsListTable;
