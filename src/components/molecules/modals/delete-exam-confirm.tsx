'use client';

import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Spinner } from '@/components/atoms/spinner';
import { Button } from '@/components/ui/button';
import { useDeleteExam } from '@/base/hooks/exams/use-delete-exam';

import type { ModalComponentType } from './types';

const DeleteExamConfirm: ModalComponentType<{ examId: number }> = ({ isOpen, close, context: { examId } }) => {
  const t = useTranslations('Dashboard.Modals.DeleteExam');

  const { deleteExam, isDeletingExam } = useDeleteExam(examId, {
    onSuccess: () => {
      close();
      toast.success(t('exam-delete-success'));
    },
    onError: () => {
      toast.error(t('exam-delete-error'));
    },
  });

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} defaultOpen={isOpen} modal onOpenChange={(isOpen) => !isOpen && close()}>
      <DialogContent>
        <DialogHeader className="flex flex-col items-center gap-1 pt-4 text-center">
          <DialogTitle className="text-2xl font-semibold">{t('title')}</DialogTitle>
          <DialogDescription className="text-xs opacity-70">{t('description')}</DialogDescription>
        </DialogHeader>
        <div className="flex w-full flex-col items-center justify-center gap-1">
          <Button className="w-full" variant="destructive" onClick={deleteExam} disabled={isDeletingExam}>
            {isDeletingExam ? <Spinner size="xs" color="background" /> : t('button-submit')}
          </Button>
          <Button variant="ghost" onClick={close} className="w-full !text-destructive">
            {t('button-cancel')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteExamConfirm;
