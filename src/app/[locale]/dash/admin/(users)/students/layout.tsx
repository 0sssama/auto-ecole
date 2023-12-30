import { getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';

import type { Locale } from '@/base/data/locales';

export default function StudentsLayout({ children }: { children: ReactNode }) {
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
    namespace: 'Dashboard.Users.Students.Header',
  });

  return {
    title: `${t('title')} / Dashboard`,
  };
}
