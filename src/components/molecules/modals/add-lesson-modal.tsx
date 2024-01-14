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
import { AddNewLessonForm } from '@/components/organisms';
import { Spinner } from '@/components/atoms/spinner';
import { api } from '@/base/utils/server/api';
import { lessonFormSchema } from '@/base/schemas/lesson-form-schema';

import type { ModalComponentType } from './types';

const AddLessonModal: ModalComponentType = ({ isOpen, close }) => {
  const t = useTranslations('Dashboard.Modals.AddLesson');

  const closeModal = () => {
    form.reset();
    close();
  };

  const form = useForm<z.infer<typeof lessonFormSchema>>({
    resolver: zodResolver(lessonFormSchema),
    defaultValues: {
      studentId: '0',
      instructorId: '0',
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
      console.log('CLEANING UP INSTRUCTOR FROM CLERK, FAILURE TO ADD TO DB');
      console.error(error);
      toast.error(t('error'));
    },
  });

  const onSubmit = (values: z.infer<typeof lessonFormSchema>) =>
    addLesson({
      ...values,
      studentId: Number(values.studentId),
      instructorId: Number(values.instructorId),
      price: Number(values.price),
      duration: Number(values.duration),
    });

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} defaultOpen={isOpen} modal onOpenChange={(isOpen) => !isOpen && closeModal()}>
      <DialogContent className="flex w-full flex-col items-center text-center">
        <DialogHeader>
          <DialogTitle className="text-center text-xl lg:text-2xl">{t('title')}</DialogTitle>
          <DialogDescription className="text-center">{t('subtitle')}</DialogDescription>
        </DialogHeader>
        <div className="max-h-[40vh] w-full max-lg:overflow-auto lg:max-h-full">
          {error && (
            <div className="mb-4 w-full rounded bg-destructive/10 px-2 py-4 text-center">
              <p className="text-center text-sm font-bold text-destructive">{t('no-user-instructor')}</p>
            </div>
          )}
          <AddNewLessonForm
            form={form}
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid w-full grid-cols-1 gap-x-6 gap-y-2"
          />
        </div>
        <DialogFooter className="mt-4 flex w-full items-center justify-end gap-2">
          <Button variant="outline" onClick={closeModal} className="w-full">
            {t('button-cancel')}
          </Button>
          <Button variant="default" onClick={form.handleSubmit(onSubmit)} disabled={isLoading} className="w-full">
            {isLoading ? <Spinner size="xs" color="background" /> : t('button-submit')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddLessonModal;
