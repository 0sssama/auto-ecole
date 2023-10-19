"use client";

import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import PageContentHeader from "./_components/page-content-header";

export default function Home() {
  const t = useTranslations("Dashboard.Home");

  return (
    <main>
      <PageContentHeader title={t("title")}>
        <div className="flex items-center">
          <Button>
            <Plus size={18} />
            <span className="hidden ml-2 lg:block">{t("button")}</span>
          </Button>
        </div>
      </PageContentHeader>

      <div className="w-full">
        <p>{t("content")}</p>
      </div>

      {/* for scroll */}
      <div className="flex min-h-[500vh]" />
    </main>
  );
}
