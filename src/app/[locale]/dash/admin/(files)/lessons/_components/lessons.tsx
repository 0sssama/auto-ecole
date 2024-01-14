'use client';

import { useTranslations } from 'next-intl';

import { useModal } from '@/base/hooks/use-modal';
import { LessonsListTable } from '@/components/sections/lessons';
import { PageHeader } from '@/components/molecules/page-header';
import { AddLessonModal } from '@/components/molecules/modal/lessons/add';

export default function LessonsPage() {
  const t = useTranslations('Dashboard.Files.Lessons.Header');
  const addLessonModal = useModal();

  return (
    <>
      <PageHeader openModal={addLessonModal.open} t={t} />
      <AddLessonModal {...addLessonModal} />
      <div className="w-full">
        <LessonsListTable />
      </div>
    </>
  );
}
