"use client";

import { PageContentHeader } from "@/components/molecules";
import { useTranslations } from "next-intl";

export default function StudentFolder() {
  const t = useTranslations("Dashboard.Student.Folder");

  return (
    <main>
      <PageContentHeader title={t("title")} />
      <div className="w-full">Hello world</div>
    </main>
  );
}
