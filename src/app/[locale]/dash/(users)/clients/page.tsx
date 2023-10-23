"use client";

import { useTranslations } from "next-intl";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddClientModal, PageContentHeader } from "@/components/molecules";
import { useModal } from "@/lib/hooks/useModal";

const PageHeader = ({ openModal }: { openModal: () => void }) => {
  const t = useTranslations("Dashboard.Users.Header");

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

export default function Home() {
  const addClientModal = useModal();

  return (
    <main>
      <PageHeader openModal={addClientModal.open} />
      <AddClientModal
        isOpen={addClientModal.isOpen}
        close={addClientModal.close}
      />
      <div className="w-full">Hello world</div>
    </main>
  );
}
