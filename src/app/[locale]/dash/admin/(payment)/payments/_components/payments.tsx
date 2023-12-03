"use client";

import { useTranslations } from "next-intl";

import { PageHeader, AddPaymentModalSike } from "@/components/molecules";
import { useModal } from "@/lib/hooks/useModal";
import { PaymentsListTable } from "@/components/sections/payments";

export default function PaymentsPage() {
  const t = useTranslations("Dashboard.Payment.Payments.Header");
  const addPaymentModalSike = useModal();

  return (
    <main>
      <PageHeader openModal={addPaymentModalSike.open} t={t} />
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
