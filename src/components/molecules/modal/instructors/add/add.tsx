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
import { Spinner } from '@/components/atoms/spinner';
import { useAddInstructor } from '@/base/hooks/instructors/add/use-add-instructor';
import { AddNewInstructorForm } from '@/components/organisms/forms/instructors/add';

import type { ModalComponentType } from '../../modal.types';

import { instructorFormSchema, type InstructorFormValues } from './add.types';

const AddInstructorModal: ModalComponentType = ({ isOpen, close }) => {
  const t = useTranslations('Dashboard.Users.Instructors.AddNewInstructorModal');

  const closeModal = () => {
    form.reset();
    close();
  };

  const form = useForm<InstructorFormValues>({
    resolver: zodResolver(instructorFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
    },
  });

  const { createInstructor, isCreating, creationError } = useAddInstructor({
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
        <div className="max-h-[80vh] overflow-auto md:max-h-full">
          {creationError && (
            <div className="mb-4 w-full rounded bg-destructive/10 px-2 py-4 text-center">
              <p className="text-center text-sm font-bold text-destructive">{t('error')}</p>
            </div>
          )}
          <AddNewInstructorForm
            form={form}
            onSubmit={form.handleSubmit(createInstructor)}
            className="grid grid-cols-1 gap-4 p-2"
          />
        </div>
        <DialogFooter className="flex items-center justify-end gap-1">
          <Button variant="ghost" onClick={closeModal}>
            {t('button-cancel')}
          </Button>
          <Button variant="default" onClick={form.handleSubmit(createInstructor)} disabled={isCreating}>
            {isCreating ? <Spinner size="xs" color="background" /> : t('button-submit')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddInstructorModal;
