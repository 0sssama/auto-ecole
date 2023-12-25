"use client";

import { useTranslations } from "next-intl";
import { Plus } from "lucide-react";

import { useModal } from "@/lib/hooks/useModal";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/organisms";
import { usePagination } from "@/lib/hooks/usePagination";
import { useTableFilters } from "@/lib/hooks/useTableFilters";
import { api } from "@/utils/api";
import type { Paginated } from "@/components/organisms/data-table/types";

import { columns } from "./columns";
import type { VehicleExpense } from "./schema";
import type { VehicleExpensesTableComponentType } from "./types";
import { AddVehicleExpenseModal } from "@/components/molecules";

const VehicleExpensesTable: VehicleExpensesTableComponentType = ({
  vehicleId,
}) => {
  const t = useTranslations("Dashboard.Dossier.Tables.VehicleExpenses");

  const pagination = usePagination({
    pageIndex: 0,
    pageSize: 2,
    pageCount: 0,
  });

  const filters = useTableFilters();

  const addExpenseModal = useModal();

  const { data, isLoading, error } =
    api.db.expenses.query.listByVehicleId.useQuery<Paginated<VehicleExpense>>({
      vehicleId,
      pageIndex: pagination.get.pageIndex,
      pageSize: pagination.get.pageSize,
      filters: filters.get,
    });

  return (
    <div className="w-full">
      <AddVehicleExpenseModal {...addExpenseModal} context={{ vehicleId }} />
      <div className="flex items-center justify-between w-full mb-4">
        <h1 className="w-full mb-4 text-2xl font-bold">{t("title")}</h1>
        <div>
          <Button onClick={addExpenseModal.open}>
            <Plus size={18} />
            <span className="hidden ml-2 lg:block whitespace-nowrap">
              {t("add-button")}
            </span>
          </Button>
        </div>
      </div>
      <DataTable
        data={data}
        error={error?.message}
        isLoading={isLoading}
        columns={columns}
        pagination={pagination}
        filters={filters}
      />
    </div>
  );
};

export default VehicleExpensesTable;
