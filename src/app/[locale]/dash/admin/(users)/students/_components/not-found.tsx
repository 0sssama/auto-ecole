'use client';

import { useTranslations } from 'next-intl';

export default function StudentNotFound() {
  const t = useTranslations('Dashboard.Users.Students.Folder.NotFound');

  return (
    <main className="flex min-h-[400px] items-center justify-center gap-4 p-12 md:p-24">
      <div className="m-auto flex w-full max-w-screen-xl flex-col items-center justify-center gap-4">
        <h1 className="text-center text-3xl font-bold lg:text-4xl">{t('title')}</h1>
        <p className="text-center text-sm font-semibold text-muted-foreground lg:text-sm">{t('subtitle')}</p>
      </div>
    </main>
  );
}
