"use client";

import { useTranslations } from "next-intl";

import { DataTable } from "@/components/organisms";
import { Paginated } from "@/components/organisms/data-table/types";
import { usePagination } from "@/lib/hooks/usePagination";
import { useTableFilters } from "@/lib/hooks/useTableFilters";
import { api } from "@/utils/api";
import { LicenseFile } from "./schema";
import { columns } from "./columns";

import type { StudentLicenseFilesTableProps } from "./types";

export default function StudentLicenseFilesTable({
  studentId,
}: StudentLicenseFilesTableProps) {
  const t = useTranslations("Dashboard.Dossier.Tables.LicenseFiles");

  const pagination = usePagination({
    pageIndex: 0,
    pageSize: 2,
    pageCount: 0,
  });

  const filters = useTableFilters();

  const { data, isLoading, error } = api.db.licenseFiles.query.list.useQuery<
    Paginated<LicenseFile>
  >({
    studentId,
    pageIndex: pagination.get.pageIndex,
    pageSize: pagination.get.pageSize,
    filters: filters.get,
  });

  return (
    <div className="w-full">
      <h1 className="w-full mb-4 text-3xl font-bold">{t("title")}</h1>
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
}
