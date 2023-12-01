"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { DataTablePaginationComponentType } from "./types";

const DataTablePagination: DataTablePaginationComponentType = ({
  pagination,
}) => {
  const t = useTranslations("Dashboard.Tables.Pagination");

  return (
    <div className="flex items-center justify-end px-2">
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">{t("rows-per-page")}</p>
          <Select
            value={`${pagination.get.pageSize}`}
            onValueChange={(value) => {
              pagination.set.pageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pagination.get.pageSize} />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          {`${t("page")} ${pagination.get.pageIndex + 1} ${t("of")} ${
            pagination.get.pageCount
          }`}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden w-8 h-8 p-0 lg:flex"
            onClick={() => pagination.set.pageIndex(0)}
            disabled={!pagination.helpers.canGetPreviousPage()}
          >
            <span className="sr-only">{t("go-to-first-page")}</span>
            <ChevronsLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            className="w-8 h-8 p-0"
            onClick={() => pagination.helpers.previousPage()}
            disabled={!pagination.helpers.canGetPreviousPage()}
          >
            <span className="sr-only">{t("go-to-previous-page")}</span>
            <ChevronLeftIcon className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            className="w-8 h-8 p-0"
            onClick={() => pagination.helpers.nextPage()}
            disabled={!pagination.helpers.canGetNextPage()}
          >
            <span className="sr-only">{t("go-to-next-page")}</span>
            <ChevronRightIcon className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden w-8 h-8 p-0 lg:flex"
            onClick={() =>
              pagination.set.pageIndex(pagination.get.pageCount - 1)
            }
            disabled={!pagination.helpers.canGetNextPage()}
          >
            <span className="sr-only">{t("go-to-last-page")}</span>
            <ChevronsRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataTablePagination;
