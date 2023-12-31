'use client';

import { useTranslations } from 'next-intl';

import { PageHeader, AddExpenseModal } from '@/components/molecules';
import { useModal } from '@/base/hooks/use-modal';
import { ExpensesListTable } from '@/components/sections/expenses';

export default function ExpensesPage() {
  const t = useTranslations('Dashboard.Payment.Expenses.Header');
  const addExpenseModal = useModal();

  return (
    <main>
      <PageHeader openModal={addExpenseModal.open} t={t} />
      <AddExpenseModal {...addExpenseModal} />
      <div className="w-full">
        <ExpensesListTable />
      </div>
    </main>
  );
}
