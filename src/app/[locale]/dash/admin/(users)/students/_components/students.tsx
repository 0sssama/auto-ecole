"use client";

import { useTranslations } from "next-intl";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageContentHeader, AddStudentModal } from "@/components/molecules";
import { useModal } from "@/lib/hooks/useModal";
import { StudentsListTable } from "@/components/sections";

const PageHeader = ({ openModal }: { openModal: () => void }) => {
  const t = useTranslations("Dashboard.Users.Students.Header");

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

export default function StudentsPage() {
  const addStudentModal = useModal();
  return (
    <main>
      <PageHeader openModal={addStudentModal.open} />
      <AddStudentModal
        isOpen={addStudentModal.isOpen}
        close={addStudentModal.close}
      />
      <div className="w-full">
        <StudentsListTable />
      </div>
    </main>
  );
}
