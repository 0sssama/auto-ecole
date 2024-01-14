'use client';

import { useTranslations } from 'next-intl';

import { StudentsListTable } from '@/components/sections/students';
import { PageHeader } from '@/components/molecules/page-header';
import { DASH_STUDENTS_CREATE_PATH } from '@/base/data/paths';

export default function StudentsPage() {
  const t = useTranslations('Dashboard.Users.Students.Header');

  return (
    <>
      <PageHeader href={DASH_STUDENTS_CREATE_PATH} t={t} />
      <div className="w-full">
        <StudentsListTable />
      </div>
    </>
  );
}
