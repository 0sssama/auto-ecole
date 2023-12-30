import { getTranslations } from 'next-intl/server';

import type { Locale } from '@/base/data/locales';

export default function Expenses() {
  return (
    <div className="grid min-h-[300px] w-full place-items-center">
      <div className="flex flex-col items-center gap-1">
        <h1 className="text-2xl font-bold">Coming soon.</h1>
        <p className="text-center text-sm opacity-70">Under construction {':)'}</p>
      </div>
    </div>
  );
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
