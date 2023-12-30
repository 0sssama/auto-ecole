'use client';

import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { Spinner } from '@/components/atoms';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useDeleteExpense } from '@/base/hooks/expenses/use-delete-expense';

import type { ModalComponentType } from './types';

const DeleteExpenseModal: ModalComponentType<{ expenseId: number }> = ({ isOpen, close, context: { expenseId } }) => {
  const t = useTranslations('Dashboard.Modals.DeleteExpense');

  const { deleteExpense, isDeletingExpense } = useDeleteExpense(expenseId, {
    onSuccess: () => {
      close();
      toast.success(t('expense-delete-success'));
    },
    onError: () => {
      toast.error(t('expense-delete-error'));
    },
  });

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} defaultOpen={isOpen} modal onOpenChange={(isOpen) => !isOpen && close()}>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle className="text-center text-xl lg:text-2xl">{t('title')}</DialogTitle>
          <DialogDescription className="text-center">{t('question')}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4 flex w-full !flex-col gap-2">
          <Button variant="destructive" onClick={deleteExpense} disabled={isDeletingExpense}>
            {isDeletingExpense ? <Spinner size="xs" color="background" /> : t('button-submit')}
          </Button>
          <Button variant="ghost" onClick={close} className="!text-destructive">
            {t('button-cancel')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteExpenseModal;
