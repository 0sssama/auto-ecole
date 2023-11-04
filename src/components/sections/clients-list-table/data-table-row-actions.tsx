"use client";

import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { clientSchema } from "./schema";
import { DataTableRowActionsProps } from "./types";

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const t = useTranslations("Dashboard.Users.ListClientsTable.Actions");

  const client = clientSchema.parse(row.original);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal className="w-4 h-4" />
          <span className="sr-only">{t("open-menu")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[160px]">
        <DropdownMenuItem
          className="text-sm font-medium cursor-pointer text-muted-foreground/90"
          onClick={() => console.log("viewing", client.id)}
        >
          <Eye className="mr-2 h-3.5 w-3.5" />
          {t("view")}
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-sm font-medium cursor-pointer text-muted-foreground/90"
          onClick={() => console.log("editing", client.name)}
        >
          <Pencil className="mr-2 h-3.5 w-3.5" />
          {t("edit")}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-sm font-medium cursor-pointer bg-red-50 text-danger/80 hover:!text-danger hover:!bg-red-100">
          <Trash2 className="mr-2 h-3.5 w-3.5" />
          {t("delete")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
