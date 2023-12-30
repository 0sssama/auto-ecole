import { getTranslations } from 'next-intl/server';

// import { getPayment } from "@/server/utils/payments/getPayment";
// import { Payment } from "@/components/sections/payments";
import type { Locale } from '@/base/data/locales';

import PaymentsPage from './_components/payments';
import PaymentNotFound from './_components/not-found';

export default async function Payments({
  searchParams: { paymentId },
}: {
  searchParams: {
    paymentId: string | undefined;
  };
}) {
  if (paymentId === undefined) return <PaymentsPage />;

  const id = Number(paymentId);

  if (Number.isNaN(id) || id <= 0) return <PaymentNotFound />;

  //   const payment = await getPayment(id);

  //   if (!payment) return <PaymentNotFound />;

  //   return <Payment payment={payment} />;
}

export async function generateMetadata({
  params: { locale },
}: {
  params: {
    locale: Locale;
  };
}) {
  const t = await getTranslations({
    locale,
    namespace: 'Dashboard.Payment.Payments.Header',
  });

  return {
    title: `${t('title')} / Dashboard`,
  };
}
