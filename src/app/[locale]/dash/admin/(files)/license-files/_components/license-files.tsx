'use client';

import { useTranslations } from 'next-intl';

import { LicenseFilesListTable } from '@/components/sections/license-files';
import { PageHeader } from '@/components/molecules/page-header';

export default function LicenseFilesPage() {
  const t = useTranslations('Dashboard.Files.LicenseFiles.Header');

  return (
    <>
      <PageHeader href="/dash/admin/license-files/create" t={t} />
      <div className="w-full">
        <LicenseFilesListTable />
      </div>
    </>
  );
}
