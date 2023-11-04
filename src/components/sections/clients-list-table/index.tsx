"use client";

import { DataTable } from "@/components/organisms";
import { Client } from "./schema";
import { api } from "@/utils/api";
import { columns } from "./columns";
import { useTranslations } from "next-intl";
import { Spinner } from "@/components/atoms";

function ClientsListTable() {
  const t = useTranslations("Dashboard.Users.ListClientsTable");

  const { data, isLoading, error } =
    api.db.customers.query.list.useQuery<Client[]>();

  return (
    <div className="w-full">
      {(error || isLoading) && (
        <div className="w-full min-h-[300px] flex items-center justify-center">
          {error && t("error")}
          {isLoading && <Spinner size="md" />}
        </div>
      )}

      {data && <DataTable data={data} columns={columns} />}
    </div>
  );
}

export default ClientsListTable;
