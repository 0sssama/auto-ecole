'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AddNewLicenseFileExpenseForm } from '@/components/organisms';
import { Spinner } from '@/components/atoms/spinner';
import { useAddExpense } from '@/base/hooks/expenses/add/use-add-expense';
import { expenseFormSchema, type ExpenseFormValues } from '@/base/schemas/expense-form.schema';

import type { ModalComponentType } from '../../../modal.types';

import type { ModalContext } from './expense.types';

const AddLicenseFileExpenseModal: ModalComponentType<ModalContext> = ({
  isOpen,
  close,
  context: { licenseFileId },
}) => {
  const t = useTranslations('Dashboard.Modals.AddLicenseFileExpense');

  const closeModal = () => {
    form.reset();
    close();
  };

  const form = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseFormSchema),
    defaultValues: {
      licenseFileId,
      sum: '0',
      comment: '',
      date: new Date(),
    },
  });

  const { addExpense, isAdding, additionError } = useAddExpense(
    { licenseFileId },
    {
      onSuccess: () => {
        toast.success(t('success'));
        closeModal();
      },
      onError: () => {
        toast.error(t('error'));
      },
    },
  );

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} defaultOpen={isOpen} modal onOpenChange={(isOpen) => !isOpen && closeModal()}>
      <DialogContent className="flex w-full flex-col items-center text-center">
        <DialogHeader>
          <DialogTitle className="text-center text-xl lg:text-2xl">{t('title')}</DialogTitle>
          <DialogDescription className="text-center">{t('subtitle')}</DialogDescription>
        </DialogHeader>
        <div className="max-h-[40vh] w-full max-lg:overflow-auto lg:max-h-full">
          {additionError && (
            <div className="mb-4 w-full rounded bg-destructive/10 px-2 py-4 text-center">
              <p className="text-center text-sm font-bold text-destructive">{t('error')}</p>
            </div>
          )}
          <AddNewLicenseFileExpenseForm
            form={form}
            onSubmit={form.handleSubmit(addExpense)}
            className="grid w-full grid-cols-1 gap-x-6 gap-y-2"
          />
        </div>
        <DialogFooter className="mt-4 flex w-full items-center justify-end gap-2">
          <Button variant="outline" onClick={closeModal} className="w-full">
            {t('button-cancel')}
          </Button>
          <Button variant="default" onClick={form.handleSubmit(addExpense)} disabled={isAdding} className="w-full">
            {isAdding ? <Spinner size="xs" color="background" /> : t('button-submit')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddLicenseFileExpenseModal;
