'use client';

import { useTranslations } from 'next-intl';

import { PageHeader, AddLicenseFileModal } from '@/components/molecules';
import { useModal } from '@/lib/hooks/use-modal';
import { LicenseFilesListTable } from '@/components/sections/license-files';

export default function LicenseFilesPage() {
  const t = useTranslations('Dashboard.Files.LicenseFiles.Header');
  const addLicenseFileModal = useModal();

  return (
    <main>
      <PageHeader openModal={addLicenseFileModal.open} t={t} />
      <AddLicenseFileModal {...addLicenseFileModal} />
      <div className="w-full">
        <LicenseFilesListTable />
      </div>
    </main>
  );
}
