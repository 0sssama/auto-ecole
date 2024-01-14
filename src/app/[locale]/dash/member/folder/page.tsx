'use client';

import { useTranslations } from 'next-intl';

import { PageContentHeader } from '@/components/molecules/page-content-header';

export default function StudentFolder() {
  const t = useTranslations('Dashboard.Student.Folder');

  return (
    <>
      <PageContentHeader title={t('title')} />
      <div className="w-full"></div>
    </>
  );
}
