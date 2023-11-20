"use client";

import { useTranslations } from "next-intl";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  PageContentHeader,
  // AddLessonsModal
} from "@/components/molecules";
import { useModal } from "@/lib/hooks/useModal";
// import { LessonsListTable } from "@/components/sections/lessons";

const PageHeader = ({ openModal }: { openModal: () => void }) => {
  const t = useTranslations("Dashboard.Files.Lessons.Header");

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

export default function LessonsPage() {
  const addLessonModal = useModal();

  return (
    <main>
      <PageHeader openModal={addLessonModal.open} />
      {/* <AddLessonModal
        isOpen={addLessonModal.isOpen}
        close={addLessonModal.close}
      /> */}
      <div className="w-full">
        {/* <LessonsListTable /> */}
        Lessons here
      </div>
    </main>
  );
}
