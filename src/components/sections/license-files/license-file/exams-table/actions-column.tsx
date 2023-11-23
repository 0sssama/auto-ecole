"use client";

import Link from "next/link";
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
import { licenseFileExamSchema } from "./schema";

import { cn } from "@/lib/cn";
import { useModal } from "@/lib/hooks/useModal";

import type { ActionsColumnProps } from "./types";
import { DeleteExamConfirmModal } from "@/components/molecules";

export function ActionsColumn({ row }: ActionsColumnProps) {
  const t = useTranslations(
    "Dashboard.Files.LicenseFiles.FilePage.LicenseFileExams.Actions",
  );

  const deleteExamModal = useModal();

  const exam = licenseFileExamSchema.parse(row.original);

  return (
    <DropdownMenu>
      <DeleteExamConfirmModal
        isOpen={deleteExamModal.isOpen}
        close={deleteExamModal.close}
        examId={exam.id}
      />
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
            href={`/dash/admin/exams?examId=${exam.id}`}
          >
            <Eye className="mr-2 h-3.5 w-3.5" />
            {t("view")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-sm font-medium cursor-pointer text-muted-foreground/90"
          onClick={() => console.log("editing", exam.id)}
        >
          <Pencil className="mr-2 h-3.5 w-3.5" />
          {t("edit")}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className={cn(
            "text-sm font-medium cursor-pointer text-danger/90 bg-danger/10 hover:!text-danger/100 hover:!bg-danger/20",
            deleteExamModal.isOpen && "opacity-50 !cursor-not-allowed",
          )}
          onClick={deleteExamModal.open}
        >
          <Trash2 className="text-destructive mr-2 h-3.5 w-3.5" />
          {t("delete")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
