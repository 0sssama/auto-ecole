'use client';

import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import { VehicleType } from '@prisma/client';

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
import { AddNewVehicleForm } from '@/components/organisms';
import { api } from '@/base/utils/server/api';
import { useFileUpload } from '@/base/hooks/use-file-upload';
import { vehicleFormSchema } from '@/base/schemas/vehicle-form-schema';

import type { ModalComponentType } from './types';

const AddVehicleModal: ModalComponentType = ({ isOpen, close }) => {
  const t = useTranslations('Dashboard.Modals.AddVehicle');

  const closeModal = () => {
    form.reset();
    close();
  };

  const form = useForm<z.infer<typeof vehicleFormSchema>>({
    resolver: zodResolver(vehicleFormSchema),
    defaultValues: {
      name: '',
      brand: '',
      image: '',
      instructorId: '0',
      type: VehicleType.CAR,
    },
  });

  const { startUpload, FileUpload, isUploading } = useFileUpload({
    endpoint: 'imageUploader',
  });

  const {
    mutate: addVehicle,
    isLoading,
    error,
  } = api.db.vehicles.mutation.create.useMutation({
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

  const onSubmit = (values: z.infer<typeof vehicleFormSchema>) =>
    startUpload()
      .then(({ response }) => response[0])
      .then(({ url }) => {
        addVehicle({
          ...values,
          image: url,
          instructorId: Number(values.instructorId),
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error(t('error'));
      });

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} defaultOpen={isOpen} modal onOpenChange={(isOpen) => !isOpen && close()}>
      <DialogContent className="flex w-full flex-col items-center text-center">
        <DialogHeader>
          <DialogTitle className="text-center text-xl lg:text-2xl">{t('title')}</DialogTitle>
          <DialogDescription className="text-center">{t('subtitle')}</DialogDescription>
        </DialogHeader>
        <div className="max-h-[40vh] w-full max-lg:overflow-auto lg:max-h-full">
          {error && (
            <div className="mb-4 w-full rounded bg-destructive/10 px-2 py-4 text-center">
              <p className="text-center text-sm font-bold text-destructive">{t('error')}</p>
            </div>
          )}
          <AddNewVehicleForm
            form={form}
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-2"
            context={{
              FileUpload,
            }}
          />
        </div>
        <DialogFooter className="mt-4 flex w-full items-center justify-end gap-2">
          <Button variant="ghost" onClick={closeModal} className="w-full">
            {t('button-cancel')}
          </Button>
          <Button
            variant="default"
            onClick={form.handleSubmit(onSubmit)}
            disabled={isLoading || isUploading}
            className="w-full"
          >
            {isLoading || isUploading ? <Spinner size="xs" color="background" /> : t('button-submit')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddVehicleModal;
