import { getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';

export default function PaymentsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
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
