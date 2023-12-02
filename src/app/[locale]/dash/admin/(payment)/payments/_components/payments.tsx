"use client";

import { useTranslations } from "next-intl";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageContentHeader, AddPaymentModalSike } from "@/components/molecules";
import { useModal } from "@/lib/hooks/useModal";
import { PaymentsListTable } from "@/components/sections/payments";

const PageHeader = ({ openModal }: { openModal: () => void }) => {
  const t = useTranslations("Dashboard.Payment.Payments.Header");

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

export default function PaymentsPage() {
  const addPaymentModalSike = useModal();

  return (
    <main>
      <PageHeader openModal={addPaymentModalSike.open} />
      <AddPaymentModalSike
        isOpen={addPaymentModalSike.isOpen}
        close={addPaymentModalSike.close}
      />
      <div className="w-full">
        <PaymentsListTable />
      </div>
    </main>
  );
}
