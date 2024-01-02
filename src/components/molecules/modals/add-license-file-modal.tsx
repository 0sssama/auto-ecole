'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { toast } from 'sonner';
import { Category, LicenseFileStatus } from '@prisma/client';
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
import { AddNewLicenseFileForm } from '@/components/organisms';
import { Spinner } from '@/components/atoms';
import { api } from '@/base/utils/server/api';
import { licenseFileFormSchema } from '@/base/schemas/license-file-form-schema';

import type { ModalComponentType } from './types';

const AddLicenseFileModal: ModalComponentType = ({ isOpen, close }) => {
  const t = useTranslations('Dashboard.Files.LicenseFiles.AddNewModal');

  const closeModal = () => {
    form.reset();
    close();
  };

  const form = useForm<z.infer<typeof licenseFileFormSchema>>({
    resolver: zodResolver(licenseFileFormSchema),
    defaultValues: {
      studentId: '0',
      instructorId: '0',
      price: '3200',
      status: LicenseFileStatus.UNDEPOSITED,
      category: Category.B,
    },
  });

  const {
    mutate: addLicenseFile,
    isLoading,
    error,
  } = api.db.licenseFiles.mutation.add.useMutation({
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

  const onSubmit = (values: z.infer<typeof licenseFileFormSchema>) =>
    addLicenseFile({
      ...values,
      studentId: Number(values.studentId),
      instructorId: Number(values.instructorId),
      price: Number(values.price),
    });

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} defaultOpen={isOpen} modal onOpenChange={(isOpen) => !isOpen && close()}>
      <DialogContent>
        <DialogHeader className="flex flex-col items-center gap-1 text-center">
          <DialogTitle className="text-2xl font-semibold">{`t('title')porn`}</DialogTitle>
          <DialogDescription className="text-xs opacity-70">{t('subtitle')}</DialogDescription>
        </DialogHeader>
        <div className="max-h-[80vh] overflow-auto md:max-h-full">
          {error && (
            <div className="mb-4 w-full rounded bg-destructive/10 px-2 py-4 text-center">
              <p className="text-center text-sm font-bold text-destructive">{t('no-user-instructor')}</p>
            </div>
          )}
          <AddNewLicenseFileForm
            form={form}
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-x-6 gap-y-2 md:grid-cols-2"
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

export default AddLicenseFileModal;
