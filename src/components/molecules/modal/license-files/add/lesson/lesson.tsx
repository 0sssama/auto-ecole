'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
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
import { type LessonFormValues, lessonFormSchema } from '@/base/schemas/lesson-form.schema';
import { useAddLesson } from '@/base/hooks/lessons/add/use-add-lesson';

import type { ModalComponentType } from '../../../modal.types';

import type { ModalContext } from './lesson.types';

const AddLessonModal: ModalComponentType<ModalContext> = ({
  isOpen,
  close,
  context: { licenseFileId, studentId, instructorId },
}) => {
  const t = useTranslations('Dashboard.Modals.AddLesson');

  const closeModal = () => {
    form.reset();
    close();
  };

  const form = useForm<LessonFormValues>({
    resolver: zodResolver(lessonFormSchema),
    defaultValues: {
      studentId: String(studentId),
      instructorId: String(instructorId),
      price: '100',
      duration: '1',
      status: LessonStatus.RESERVED,
    },
  });

  const { addLesson, isAdding, additionError } = useAddLesson(licenseFileId, {
    onSuccess: () => {
      toast.success(t('success'));
      closeModal();
    },
    onError: () => {
      toast.error(t('error'));
    },
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
          {additionError && (
            <div className="mb-4 w-full rounded bg-destructive/10 px-2 py-4 text-center">
              <p className="text-center text-sm font-bold text-destructive">{t('no-user-instructor')}</p>
            </div>
          )}
          <AddNewLessonForm
            form={form}
            onSubmit={form.handleSubmit(addLesson)}
            className="grid grid-cols-1 gap-x-6 gap-y-2 md:grid-cols-2"
            context={{ isLicenseFileLesson: true }}
          />
        </div>
        <DialogFooter className="flex items-center justify-end gap-1">
          <Button variant="ghost" onClick={closeModal}>
            {t('button-cancel')}
          </Button>
          <Button variant="default" onClick={form.handleSubmit(addLesson)} disabled={isAdding}>
            {isAdding ? <Spinner size="xs" color="background" /> : t('button-submit')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddLessonModal;
