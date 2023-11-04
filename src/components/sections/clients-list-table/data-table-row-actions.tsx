"use client";

import {
  Archive,
  ArchiveRestore,
  Eye,
  MoreHorizontal,
  Pencil,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useArchiveClient,
  useUnarchiveClient,
} from "@/lib/hooks/useArchiveClient";
import { cn } from "@/lib/cn";
import { clientSchema } from "./schema";

import type { DataTableRowActionsProps } from "./types";

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const t = useTranslations("Dashboard.Users.ListClientsTable.Actions");

  const client = clientSchema.parse(row.original);

  const { unarchiveClient, isUnarchivingClient } = useUnarchiveClient(
    client.id,
    {
      onSuccess: () => toast.success(t("unarchive-success")),
      onError: () => toast.error(t("unarchive-error")),
    },
  );

  const { archiveClient, isArchivingClient } = useArchiveClient(client.id, {
    onSuccess: () => toast.success(t("archive-success")),
    onError: () => toast.error(t("archive-error")),
  });

  const loading = isArchivingClient || isUnarchivingClient;

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
        <DropdownMenuItem
          className={cn(
            "text-sm font-medium cursor-pointer text-danger/90 bg-danger/10 hover:!text-danger/100 hover:!bg-danger/20",
            loading && "opacity-50 !cursor-not-allowed",
          )}
          onClick={() => {
            if (loading) return;

            toast.loading(t("loading"));
            if (client.archived) unarchiveClient();
            else archiveClient();
          }}
        >
          {client.archived ? (
            <>
              <ArchiveRestore className="mr-2 h-3.5 w-3.5" />
              {t("unarchive")}
            </>
          ) : (
            <>
              <Archive className="mr-2 h-3.5 w-3.5" />
              {t("archive")}
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
