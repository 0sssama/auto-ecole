"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import type { DataTableToolbarComponentType } from "./types";

const DataTableToolbar: DataTableToolbarComponentType = ({
  filters,
  filtersAllowed,
}) => {
  const t = useTranslations("Dashboard.Tables");
  const [search, setSearch] = useState("");

  const isFiltered = filters.get.search !== "";

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (search !== filters.get.search) {
        filters.set.search(search);
      }
    }, 200);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  if (!filtersAllowed) return null;

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center flex-1 space-x-2">
        {filtersAllowed.search && (
          <div className="relative">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-[50%] translate-y-[-50%]" />
            <Input
              placeholder={t("search")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 w-[180px] lg:w-[300px] pl-10"
            />
          </div>
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              setSearch("");
              filters.helpers.resetAll();
            }}
            className="h-10 px-3 lg:px-6"
          >
            {t("reset")}
            <X className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default DataTableToolbar;
