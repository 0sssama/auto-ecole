import { getTranslations } from 'next-intl/server';

import type { Locale } from '@/lib/locales';

export default function FinancialOverview() {
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
    namespace: 'Dashboard.Payment.FinancialOverview.Header',
  });

  return {
    title: `${t('title')} / Dashboard`,
  };
}
