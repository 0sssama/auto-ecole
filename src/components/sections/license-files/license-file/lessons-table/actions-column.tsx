"use client";

import Link from "next/link";
import { Eye, MoreHorizontal, Pencil } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ActionsColumnComponentType } from "@/components/organisms/data-table/types";

import { type LicenseFileLesson, licenseFileLessonSchema } from "./schema";

const ActionsColumn: ActionsColumnComponentType<LicenseFileLesson> = ({
  row,
}) => {
  const t = useTranslations(
    "Dashboard.Files.LicenseFiles.FilePage.LicenseFileLessons.Actions",
  );

  const lesson = licenseFileLessonSchema.parse(row.original);

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
            href={`/dash/admin/lessons?lessonId=${lesson.id}`}
          >
            <Eye className="mr-2 h-3.5 w-3.5" />
            {t("view")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-sm font-medium cursor-pointer text-muted-foreground/90"
          onClick={() => console.log("editing", lesson.id)}
        >
          <Pencil className="mr-2 h-3.5 w-3.5" />
          {t("edit")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionsColumn;
