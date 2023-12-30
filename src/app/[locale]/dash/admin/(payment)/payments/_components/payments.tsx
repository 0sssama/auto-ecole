'use client';

import { useTranslations } from 'next-intl';

import { PageHeader, AddPaymentModalSike } from '@/components/molecules';
import { useModal } from '@/base/hooks/use-modal';
import { PaymentsListTable } from '@/components/sections/payments';

export default function PaymentsPage() {
  const t = useTranslations('Dashboard.Payment.Payments.Header');
  const addPaymentModalSike = useModal();

  return (
    <main>
      <PageHeader openModal={addPaymentModalSike.open} t={t} />
      <AddPaymentModalSike {...addPaymentModalSike} />
      <div className="w-full">
        <PaymentsListTable />
      </div>
    </main>
  );
}
