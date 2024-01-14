'use client';

import { useTranslations } from 'next-intl';

import { useModal } from '@/base/hooks/use-modal';
import { InstructorsListTable } from '@/components/sections/instructors';
import { PageHeader } from '@/components/molecules/page-header';
import { AddInstructorModal } from '@/components/molecules/modal/instructors/add';

export default function InstructorsPage() {
  const t = useTranslations('Dashboard.Users.Instructors.Header');
  const addInstructorModal = useModal();

  return (
    <main>
      <PageHeader openModal={addInstructorModal.open} t={t} />
      <AddInstructorModal {...addInstructorModal} />
      <div className="w-full">
        <InstructorsListTable />
      </div>
    </main>
  );
}
