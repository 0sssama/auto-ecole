'use client';

import { useTranslations } from 'next-intl';

import { useModal } from '@/base/hooks/use-modal';
import { ExamsListTable } from '@/components/sections/exams';
import { AddExamModalSike } from '@/components/molecules/modal/exams/add-sike';
import { PageHeader } from '@/components/molecules/page-header';

export default function ExamsPage() {
  const t = useTranslations('Dashboard.Files.Exams.Header');
  const addExamModalSike = useModal();

  return (
    <>
      <PageHeader openModal={addExamModalSike.open} t={t} />
      <AddExamModalSike {...addExamModalSike} />
      <div className="w-full">
        <ExamsListTable />
      </div>
    </>
  );
}
