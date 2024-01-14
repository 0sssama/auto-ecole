'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { toast } from 'sonner';
import { LessonStatus } from '@prisma/client';
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
import { Spinner } from '@/components/atoms/spinner';
import { AddNewLessonForm } from '@/components/organisms';
import { api } from '@/base/utils/server/api';
import { lessonFormSchema } from '@/base/schemas/lesson-form-schema';

import type { ModalComponentType } from './types';

const AddLessonModal: ModalComponentType<{
  licenseFileId: number;
  studentId: number;
  instructorId: number;
}> = ({ isOpen, close, context }) => {
  const t = useTranslations('Dashboard.Modals.AddLesson');

  const closeModal = () => {
    form.reset();
    close();
  };

  const form = useForm<z.infer<typeof lessonFormSchema>>({
    resolver: zodResolver(lessonFormSchema),
    defaultValues: {
      studentId: String(context.studentId),
      instructorId: String(context.instructorId),
      price: '100',
      duration: '1',
      status: LessonStatus.RESERVED,
    },
  });

  const {
    mutate: addLesson,
    isLoading,
    error,
  } = api.db.lessons.mutation.add.useMutation({
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

  const onSubmit = (values: z.infer<typeof lessonFormSchema>) =>
    addLesson({
      ...values,
      licenseFileId: context.licenseFileId,
      studentId: Number(values.studentId),
      instructorId: Number(values.instructorId),
      price: Number(values.price),
      duration: Number(values.duration),
    });

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} defaultOpen={isOpen} modal onOpenChange={(isOpen) => !isOpen && close()}>
      <DialogContent>
        <DialogHeader className="flex flex-col items-center gap-1 text-center">
          <DialogTitle className="text-2xl font-semibold">{t('title')}</DialogTitle>
          <DialogDescription className="text-xs opacity-70">{t('subtitle')}</DialogDescription>
        </DialogHeader>
        <div className="max-h-[80vh] overflow-auto p-2 md:max-h-full">
          {error && (
            <div className="mb-4 w-full rounded bg-destructive/10 px-2 py-4 text-center">
              <p className="text-center text-sm font-bold text-destructive">{t('no-user-instructor')}</p>
            </div>
          )}
          <AddNewLessonForm
            form={form}
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-x-6 gap-y-2 md:grid-cols-2"
            context={{ isLicenseFileLesson: true }}
          />
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

export default AddLessonModal;
