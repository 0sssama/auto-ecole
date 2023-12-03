"use client";

import { useTranslations } from "next-intl";

import { AddExamModalSike, PageHeader } from "@/components/molecules";
import { useModal } from "@/lib/hooks/useModal";
import { ExamsListTable } from "@/components/sections/exams";

export default function ExamsPage() {
  const t = useTranslations("Dashboard.Files.Exams.Header");
  const addExamModalSike = useModal();

  return (
    <main>
      <PageHeader openModal={addExamModalSike.open} t={t} />
      <AddExamModalSike
        isOpen={addExamModalSike.isOpen}
        close={addExamModalSike.close}
      />
      <div className="w-full">
        <ExamsListTable />
      </div>
    </main>
  );
}
