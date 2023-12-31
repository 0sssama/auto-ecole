'use client';

import { useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import { ExamStatus, ExamType } from '@prisma/client';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { toast } from 'sonner';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/atoms';
import { AddNewExamForm } from '@/components/organisms';
import { examFormSchema } from '@/base/schemas/exam-form-schema';
import { api } from '@/base/utils/server/api';

import type { ModalComponentType } from './types';

const AddExamModal: ModalComponentType<{
  licenseFileId: number;
}> = ({ isOpen, close, context: { licenseFileId } }) => {
  const t = useTranslations('Dashboard.Modals.AddExam');

  const closeModal = () => {
    form.reset();
    close();
  };

  const form = useForm<z.infer<typeof examFormSchema>>({
    resolver: zodResolver(examFormSchema),
    defaultValues: {
      type: ExamType.CODE,
      status: ExamStatus.PENDING,
      date: new Date(),
    },
  });

  const {
    mutate: addExamToLicenseFile,
    isLoading,
    error,
  } = api.db.exams.mutation.addToLicenseFile.useMutation({
    onSuccess: () => {
      //   void ctx.users.getPage.invalidate();
      toast.success(t('success'));
      closeModal();
    },
    onError: (error) => {
      console.error(error);
      toast.error(t('error'));
    },
  });

  const onSubmit = (values: z.infer<typeof examFormSchema>) =>
    addExamToLicenseFile({
      ...values,
      licenseFileId,
    });

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} defaultOpen={isOpen} modal onOpenChange={(isOpen) => !isOpen && closeModal()}>
      <DialogContent>
        <DialogHeader className="flex flex-col items-center gap-1 text-center">
          <DialogTitle className="text-2xl font-semibold">{t('title')}</DialogTitle>
          <DialogDescription className="text-xs opacity-70">{t('subtitle')}</DialogDescription>
        </DialogHeader>
        <div className="max-h-[80vh] overflow-auto md:max-h-full">
          {error && (
            <div className="mb-4 w-full rounded bg-destructive/10 px-2 py-4 text-center">
              <p className="text-center text-sm font-bold text-destructive">{t('error')}</p>
            </div>
          )}
          <AddNewExamForm form={form} onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-2" />
        </div>
        <DialogFooter className="flex items-center justify-end gap-1">
          <Button variant="ghost" onClick={closeModal}>
            {t('button-cancel')}
          </Button>
          <Button variant="default" onClick={form.handleSubmit(onSubmit)} disabled={isLoading}>
            {isLoading ? <Spinner size="xs" color="background" /> : t('button-submit')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddExamModal;
