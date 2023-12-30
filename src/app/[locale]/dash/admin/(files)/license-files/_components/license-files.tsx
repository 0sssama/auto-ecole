'use client';

import { useTranslations } from 'next-intl';

import { PageHeader } from '@/components/molecules';
import { LicenseFilesListTable } from '@/components/sections/license-files';

export default function LicenseFilesPage() {
  const t = useTranslations('Dashboard.Files.LicenseFiles.Header');

  return (
    <main>
      <PageHeader href="/dash/admin/license-files/create" t={t} />
      <div className="w-full">
        <LicenseFilesListTable />
      </div>
    </main>
  );
}
