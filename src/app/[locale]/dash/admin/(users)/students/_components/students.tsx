'use client';

import { useTranslations } from 'next-intl';

import { PageHeader, AddStudentModal } from '@/components/molecules';
import { useModal } from '@/base/hooks/use-modal';
import { StudentsListTable } from '@/components/sections/students';

export default function StudentsPage() {
  const t = useTranslations('Dashboard.Users.Students.Header');
  const addStudentModal = useModal();

  return (
    <main>
      <PageHeader openModal={addStudentModal.open} t={t} />
      <AddStudentModal {...addStudentModal} />
      <div className="w-full">
        <StudentsListTable />
      </div>
    </main>
  );
}
