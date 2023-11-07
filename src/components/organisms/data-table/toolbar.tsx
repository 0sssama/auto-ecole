"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import type { DataTableToolbarProps } from "./types";

export function DataTableToolbar({ filters }: DataTableToolbarProps) {
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

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center flex-1 space-x-2">
        <Input
          placeholder={t("search")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              setSearch("");
              filters.helpers.resetAll();
            }}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}
