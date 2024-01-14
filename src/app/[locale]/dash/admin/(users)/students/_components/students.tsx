'use client';

import { useTranslations } from 'next-intl';

import { StudentsListTable } from '@/components/sections/students';
import { PageHeader } from '@/components/molecules/page-header';

export default function StudentsPage() {
  const t = useTranslations('Dashboard.Users.Students.Header');

  return (
    <>
      <PageHeader href="/dash/admin/students/create" t={t} />
      <div className="w-full">
        <StudentsListTable />
      </div>
    </>
  );
}
