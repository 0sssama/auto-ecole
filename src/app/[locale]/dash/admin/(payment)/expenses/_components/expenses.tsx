'use client';

import { useTranslations } from 'next-intl';

import { useModal } from '@/base/hooks/use-modal';
import { ExpensesListTable } from '@/components/sections/expenses';
import { PageHeader } from '@/components/molecules/page-header';
import { AddExpenseModal } from '@/components/molecules/modal/expenses/add';

export default function ExpensesPage() {
  const t = useTranslations('Dashboard.Payment.Expenses.Header');
  const addExpenseModal = useModal();

  return (
    <>
      <PageHeader openModal={addExpenseModal.open} t={t} />
      <AddExpenseModal {...addExpenseModal} />
      <div className="w-full">
        <ExpensesListTable />
      </div>
    </>
  );
}
