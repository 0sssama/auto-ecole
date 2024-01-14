'use client';

import { useTranslations } from 'next-intl';

import { LicenseFilesListTable } from '@/components/sections/license-files';
import { PageHeader } from '@/components/molecules/page-header';
import { DASH_LICENSE_FILES_CREATE_PATH } from '@/base/data/paths';

export default function LicenseFilesPage() {
  const t = useTranslations('Dashboard.Files.LicenseFiles.Header');

  return (
    <>
      <PageHeader href={DASH_LICENSE_FILES_CREATE_PATH} t={t} />
      <div className="w-full">
        <LicenseFilesListTable />
      </div>
    </>
  );
}
