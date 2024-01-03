import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { enforceSuperAdmin } from '@/base/utils/server/auth/enforce-super-admin';

export default async function ExpensesLayout({ children }: { children: ReactNode }) {
  const allowed = await enforceSuperAdmin();

  if (!allowed) notFound();

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
    namespace: 'Dashboard.Payment.Expenses.Header',
  });

  return {
    title: `${t('title')} / Dashboard`,
  };
}
