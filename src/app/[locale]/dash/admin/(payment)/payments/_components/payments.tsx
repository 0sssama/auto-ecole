'use client';

import { useTranslations } from 'next-intl';

import { useModal } from '@/base/hooks/use-modal';
import { PaymentsListTable } from '@/components/sections/payments';
import { PageHeader } from '@/components/molecules/page-header';
import AddPaymentModalSike from '@/components/molecules/modal/payments/add-payment-modal-sike';

export default function PaymentsPage() {
  const t = useTranslations('Dashboard.Payment.Payments.Header');
  const addPaymentModalSike = useModal();

  return (
    <>
      <PageHeader openModal={addPaymentModalSike.open} t={t} />
      <AddPaymentModalSike {...addPaymentModalSike} />
      <div className="w-full">
        <PaymentsListTable />
      </div>
    </>
  );
}
