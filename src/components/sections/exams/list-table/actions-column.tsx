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
import { DeleteExamConfirmModal } from "@/components/molecules";
import { useModal } from "@/lib/hooks/useModal";
import { cn } from "@/lib/cn";
import type { ActionsColumnComponentType } from "@/components/organisms/data-table/types";

import { type Exam, examSchema } from "./schema";

const ActionsColumn: ActionsColumnComponentType<Exam> = ({ row }) => {
  const t = useTranslations("Dashboard.Files.Exams.ListTable.Actions");

  const deleteExamModal = useModal();

  const exam = examSchema.parse(row.original);

  return (
    <DropdownMenu>
      <DeleteExamConfirmModal
        {...deleteExamModal}
        context={{ examId: exam.id }}
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
            "text-sm font-medium cursor-pointer text-destructive/90 bg-destructive/10 hover:!text-destructive/100 hover:!bg-destructive/20",
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
};

export default ActionsColumn;
