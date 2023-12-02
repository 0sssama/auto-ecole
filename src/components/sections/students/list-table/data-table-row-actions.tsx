"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import {
  Archive,
  ArchiveRestore,
  Eye,
  MoreHorizontal,
  Pencil,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useArchiveStudent,
  useUnarchiveStudent,
} from "@/lib/hooks/students/useArchiveStudent";
import { cn } from "@/lib/cn";

import { studentSchema, type Student } from "./schema";
import type { ActionsColumnComponentType } from "@/components/organisms/data-table/types";

const ActionsColumn: ActionsColumnComponentType<Student> = ({ row }) => {
  const t = useTranslations(
    "Dashboard.Users.Students.ListStudentsTable.Actions",
  );

  const student = studentSchema.parse(row.original);

  const { unarchiveStudent, isUnarchivingStudent } = useUnarchiveStudent(
    student.id,
    {
      onSuccess: () => toast.success(t("unarchive-success")),
      onError: () => toast.error(t("unarchive-error")),
    },
  );

  const { archiveStudent, isArchivingStudent } = useArchiveStudent(student.id, {
    onSuccess: () => toast.success(t("archive-success")),
    onError: () => toast.error(t("archive-error")),
  });

  const loading = isArchivingStudent || isUnarchivingStudent;

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
            href={`/dash/admin/students?student=${student.id}`}
          >
            <Eye className="mr-2 h-3.5 w-3.5" />
            {t("view")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-sm font-medium cursor-pointer text-muted-foreground/90"
          onClick={() => console.log("editing", student.name)}
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
            if (student.archived) unarchiveStudent();
            else archiveStudent();
          }}
        >
          {student.archived ? (
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
};

export default ActionsColumn;
