'use client';

import { useTranslations } from 'next-intl';

import { PageHeader } from '@/components/molecules';
import { StudentsListTable } from '@/components/sections/students';

export default function StudentsPage() {
  const t = useTranslations('Dashboard.Users.Students.Header');

  return (
    <main>
      <PageHeader href="/dash/admin/students/create" t={t} />
      <div className="w-full">
        <StudentsListTable />
      </div>
    </main>
  );
}
