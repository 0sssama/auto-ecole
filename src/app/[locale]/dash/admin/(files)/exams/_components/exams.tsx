"use client";

import { useTranslations } from "next-intl";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageContentHeader, AddExamModal } from "@/components/molecules";
import { useModal } from "@/lib/hooks/useModal";
import { ExamsListTable } from "@/components/sections/exams";

const PageHeader = ({ openModal }: { openModal: () => void }) => {
  const t = useTranslations("Dashboard.Files.Exams.Header");

  return (
    <PageContentHeader title={t("title")}>
      <div className="flex items-center">
        <Button onClick={openModal}>
          <Plus size={18} />
          <span className="hidden ml-2 lg:block">{t("button")}</span>
        </Button>
      </div>
    </PageContentHeader>
  );
};

export default function ExamsPage() {
  const addExamModal = useModal();

  return (
    <main>
      <PageHeader openModal={addExamModal.open} />
      <AddExamModal isOpen={addExamModal.isOpen} close={addExamModal.close} />
      <div className="w-full">
        <ExamsListTable />
      </div>
    </main>
  );
}
