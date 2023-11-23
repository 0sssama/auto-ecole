"use client";

import { useTranslations } from "next-intl";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageContentHeader, AddInstructorModal } from "@/components/molecules";
import { useModal } from "@/lib/hooks/useModal";
import { InstructorsListTable } from "@/components/sections/instructors";

const PageHeader = ({ openModal }: { openModal: () => void }) => {
  const t = useTranslations("Dashboard.Users.Instructors.Header");

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

export default function InstructorsPage() {
  const addInstructorModal = useModal();

  return (
    <main>
      <PageHeader openModal={addInstructorModal.open} />
      <AddInstructorModal
        isOpen={addInstructorModal.isOpen}
        close={addInstructorModal.close}
      />
      <div className="w-full">
        <InstructorsListTable />
      </div>
    </main>
  );
}
