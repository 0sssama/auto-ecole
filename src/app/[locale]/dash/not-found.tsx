'use client';

import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('Dashboard.404');

  return (
    <div className="flex min-h-[400px] items-center justify-center gap-4 p-12 md:p-24">
      <div className="m-auto flex w-full max-w-screen-xl flex-col items-center justify-center gap-4">
        <h1 className="text-center text-3xl font-bold lg:text-4xl">404</h1>
        <p className="text-center text-sm font-semibold text-muted-foreground lg:text-sm">{t('page-not-found')}</p>
      </div>
    </div>
  );
}
