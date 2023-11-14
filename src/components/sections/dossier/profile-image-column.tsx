"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { FolderDown, ImageDown, UploadCloud, UserCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { ProfileImageColumnProps } from "./types";

export default function ProfileImageColumn({
  profilePictureUrl,
  studentName,
}: ProfileImageColumnProps) {
  const t = useTranslations("Dashboard.Dossier.ImageColumn");

  return (
    <div className="flex items-center w-full gap-4 md:flex-col max-w-[90vw]">
      <div className="flex flex-col items-center w-full gap-2">
        <div className="group flex items-center justify-center w-full max-w-[140px] overflow-hidden bg-gray-200 rounded-full aspect-square cursor-pointer relative">
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center p-1 transition-all ease-in bg-gray-600/40 group-hover:bg-gray-600/80 group-hover:p-2 duration-400">
            <UploadCloud className="text-white" size={16} />
          </div>
          {profilePictureUrl ? (
            <Image src={profilePictureUrl} alt={studentName} />
          ) : (
            <UserCircle2 className="text-gray-400" size={32} />
          )}
        </div>
        <div className="flex flex-col items-center text-center">
          <p className="text-lg font-bold">{studentName}</p>
          <p className="text-xs text-gray-500">{t("student")}</p>
        </div>
      </div>
      <div className="flex flex-col w-full gap-2">
        <Button className="w-full text-sm" variant="default" size="sm">
          <FolderDown size={16} className="mr-2" />
          {t("student-file")}
        </Button>
        <Button className="w-full text-sm" variant="outline" size="sm">
          <ImageDown size={16} className="mr-2" />
          {t("student-cin")}
        </Button>
      </div>
    </div>
  );
}
