"use client";

import { Eye, MoreHorizontal, Pencil } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { licenseFileSchema } from "./schema";

import type { ActionsColumnProps } from "./types";

export function ActionsColumn({ row }: ActionsColumnProps) {
  const t = useTranslations("Dashboard.Files.LicenseFiles.ListTable.Actions");

  const licenseFile = licenseFileSchema.parse(row.original);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal className="w-4 h-4" />
          <span className="sr-only">{t("open-menu")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[160px]">
        <DropdownMenuItem className="text-sm font-medium cursor-pointer text-muted-foreground/90">
          <Link
            className="flex items-center w-full h-full"
            href={`/dash/admin/licenseFiles?licenseFileId=${licenseFile.id}`}
          >
            <Eye className="mr-2 h-3.5 w-3.5" />
            {t("view")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-sm font-medium cursor-pointer text-muted-foreground/90"
          onClick={() => console.log("editing", licenseFile.id)}
        >
          <Pencil className="mr-2 h-3.5 w-3.5" />
          {t("edit")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
