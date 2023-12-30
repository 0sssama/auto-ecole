'use client';

import { useTranslations } from 'next-intl';

import { PageContentHeader } from '@/components/molecules';

export default function StudentFolder() {
  const t = useTranslations('Dashboard.Student.Folder');

  return (
    <main>
      <PageContentHeader title={t('title')} />
      <div className="w-full"></div>
    </main>
  );
}
