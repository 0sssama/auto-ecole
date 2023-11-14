import { HTMLAttributes } from "react";
import { ArrowDownAZ, ArrowUpZA, ChevronsDownUp, EyeOff } from "lucide-react";
import { Column } from "@tanstack/react-table";

import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslations } from "next-intl";

interface DataTableColumnHeaderProps<TData, TValue>
  extends HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const t = useTranslations("Dashboard.Tables.Header");

  if (!column.getCanSort()) {
    return <div className={cn(className)}>{t(title)}</div>;
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span>{t(title)}</span>
            {column.getIsSorted() === "desc" ? (
              <ArrowDownAZ className="w-4 h-4 ml-2" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUpZA className="w-4 h-4 ml-2" />
            ) : (
              <ChevronsDownUp className="w-3 h-3 ml-2" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem
            onClick={() => column.toggleSorting(false)}
            className="text-sm font-medium text-muted-foreground/90"
          >
            <ArrowUpZA className="mr-2 h-3.5 w-3.5" />
            {t("asc")}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => column.toggleSorting(true)}
            className="text-sm font-medium text-muted-foreground/90"
          >
            <ArrowDownAZ className="mr-2 h-3.5 w-3.5" />
            {t("desc")}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => column.toggleVisibility(false)}
            className="text-sm font-medium text-muted-foreground/90"
          >
            <EyeOff className="mr-2 h-3.5 w-3.5" />
            {t("hide")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
