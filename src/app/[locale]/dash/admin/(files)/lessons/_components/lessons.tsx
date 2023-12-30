'use client';

import { useTranslations } from 'next-intl';

import { PageHeader, AddLessonModal } from '@/components/molecules';
import { useModal } from '@/base/hooks/use-modal';
import { LessonsListTable } from '@/components/sections/lessons';

export default function LessonsPage() {
  const t = useTranslations('Dashboard.Files.Lessons.Header');
  const addLessonModal = useModal();

  return (
    <main>
      <PageHeader openModal={addLessonModal.open} t={t} />
      <AddLessonModal {...addLessonModal} />
      <div className="w-full">
        <LessonsListTable />
      </div>
    </main>
  );
}
